from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import  AllowAny
from rest_framework import mixins
from .serializers import UserSerializer, UserCreateSerializer, UserUpdateSerializer
from .models import User

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
        return serializer.save()
    
    def perform_destroy(self, instance):
        instance.delete()

    def perform_retrieve(self, instance):
        return instance