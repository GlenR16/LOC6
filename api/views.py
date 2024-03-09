from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import  AllowAny
from rest_framework import mixins
from .serializers import GameSerializer, GameSessionSerializer, UserSerializer, UserCreateSerializer, UserUpdateSerializer
from .models import GameSession, SessionDataPoint, User,Game

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
    
class GamesViewSet(mixins.ListModelMixin,GenericViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()
    
    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve' or self.action == 'options':
            return [AllowAny()]
        return super().get_permissions()
    
    def perform_list(self, serializer):
        return serializer.save()
    
    def perform_retrieve(self, instance):
        return instance
    
class GameSessionViewSet(mixins.ListModelMixin,mixins.CreateModelMixin,GenericViewSet):
    serializer_class = GameSessionSerializer
    queryset = GameSession.objects.all()

    def get_queryset(self):
        if self.action == 'list':
            return self.request.user.game_sessions.all()
        return super().get_queryset()
    
    def get_permissions(self):
        if self.action == 'list' or self.action == 'create' or self.action == 'options':
            return [AllowAny()]
        return super().get_permissions()
    
    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            kwargs['data']._mutable = True
            kwargs['data']['user'] = self.request.user.id
            kwargs['data']._mutable = False
        return super().get_serializer(*args, **kwargs)
    
    def perform_list(self, serializer):
        return self.request.user.game_sessions.all()
    
    def perform_create(self, serializer):
        return serializer.save()
    
    def perform_retrieve(self, instance):
        return instance
    
class SessionDataPointViewSet(mixins.ListModelMixin,mixins.CreateModelMixin,GenericViewSet):
    serializer_class = GameSessionSerializer
    queryset = SessionDataPoint.objects.all()
    
    def get_permissions(self):
        if self.action == 'list' or self.action == 'create' or self.action == 'options':
            return [AllowAny()]
        return super().get_permissions()
    
    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            kwargs['data']._mutable = True
            kwargs['data']['user'] = self.request.user.id
            kwargs['data']._mutable = False
        return super().get_serializer(*args, **kwargs)
    
    def perform_list(self, serializer):
        self.kwargs['session'] = self.request.user.game_sessions.all()
        return self.request.user.game_sessions.all()
    
    def perform_create(self, serializer):
        return serializer.save()