from rest_framework import serializers

from .models import Game, GameSession, SessionDataPoint, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name','phone','profile','created_at']
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True},
        }

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','name','phone','password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','phone','profile']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id','name','description','tags','url','image','created_at']
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True},
        }

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['id','user','is_active','created_at']
        extra_kwargs = {
            'id': {'read_only': True},
            'user': {'read_only': True},
            'is_active': {'read_only': True},
            'created_at': {'read_only': True},
        }

class SessionDataPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionDataPoint
        fields = ['id','session','game','active_time','created_at']
        extra_kwargs = {
            'id': {'read_only': True},
            'session': {'read_only': True},
            'created_at': {'read_only': True},
        }
        depth = 1

class SessionDataListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionDataPoint
        fields = ['id','session','game','active_time','created_at']

