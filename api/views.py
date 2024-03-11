from turtle import st
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import  AllowAny,IsAuthenticated
from rest_framework import mixins
from .serializers import GameSerializer, GameSessionSerializer, SessionDataPointSerializer, UserSerializer, UserCreateSerializer, UserUpdateSerializer,SessionDataListSerializer
from .models import GameSession, SessionDataPoint, User,Game
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class UserViewSet(mixins.CreateModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,GenericViewSet):
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        if self.action == 'update':
            return UserUpdateSerializer
        return UserSerializer
    
    def get_permissions(self):
        if self.action == 'create' or self.action == 'options' :
            return [AllowAny()]
        return super().get_permissions()
    
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
    
    def get_object(self):
        return self.request.user
    
    def perform_create(self, serializer):
        return serializer.save()
    
    def perform_update(self, serializer):
        if serializer.cleaned_data.get("interests"):
            serializer.instance.add_interest(serializer.cleaned_data.get("interests"))
        return serializer.save()
    
    def perform_destroy(self, instance):
        instance.delete()

    def perform_retrieve(self, instance):
        return instance
    
class GamesViewSet(mixins.ListModelMixin,mixins.RetrieveModelMixin,GenericViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()
    
    def get_permissions(self):
        return [AllowAny()]
    
    def perform_retrieve(self, instance):
        return instance
    
    def perform_list(self, serializer):

        return self.get_queryset()
    
class UserGamesViewSet(mixins.ListModelMixin,GenericViewSet):
    serializer_class = GameSerializer
    
    def get_queryset(self):
        return self.request.user.games.all()
    
    def get_permissions(self):
        return [IsAuthenticated()]
    
    def perform_list(self, serializer):
        return self.get_queryset()

class UserGamesEdit(APIView):
    def post(self, request, pk):
        game = Game.objects.get(pk=pk)
        request.user.games.add(game)
        return Response(status=201)
    
    def delete(self, request, pk):
        game = Game.objects.get(pk=pk)
        request.user.games.remove(game)
        return Response(status=204)
    
class GameSessionViewSet(mixins.RetrieveModelMixin,mixins.ListModelMixin,mixins.CreateModelMixin,mixins.DestroyModelMixin,GenericViewSet):
    serializer_class = GameSessionSerializer

    def get_queryset(self):
        return self.request.user.game_sessions.all().order_by('-created_at')
    
    def get_permissions(self):
        if self.action == 'list' or self.action == 'create' or self.action == 'options':
            return [IsAuthenticated()]
        return super().get_permissions()
    
    def get_object(self):
        return self.get_queryset().filter(is_active=True).order_by('-created_at').first()
    
    def perform_list(self, serializer):
        return self.request.user.game_sessions.all()
    
    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        return serializer.save()
    
    def perform_retrieve(self, instance):
        return instance

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
    
class SessionDataPointViewSet(mixins.ListModelMixin,mixins.CreateModelMixin,GenericViewSet):
    serializer_class = SessionDataPointSerializer

    def get_permissions(self):
        if self.action == 'list' or self.action == 'create' or self.action == 'options':
            return [IsAuthenticated()]
        return super().get_permissions()
    
    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            kwargs['data']['user'] = self.request.user.id
        return super().get_serializer(*args, **kwargs)
    
    def get_queryset(self):
        return self.request.user.game_sessions.filter(id=self.kwargs.get('pk')).first().data_points.all()
    
    def perform_create(self, serializer):
        serializer.validated_data['session'] = self.request.user.game_sessions.order_by('-created_at').first()
        return serializer.save()