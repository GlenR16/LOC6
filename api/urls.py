from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import UserViewSet, GamesViewSet, GameSessionViewSet, SessionDataPointViewSet,UserGamesViewSet,UserGamesEdit

urlpatterns = [
    # Token urls
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # User urls
    path('user/', UserViewSet.as_view({'get':'retrieve',"post":"create","put":"update","delete":"destroy"}), name='user-viewset'),
    path('user/games/', UserGamesViewSet.as_view({'get':'list'}), name='user-games-viewset'),
    path('user/games/<int:pk>/', UserGamesEdit.as_view(), name='user-games-editset'),
    # Game urls
    path('games/', GamesViewSet.as_view({'get':'list'}), name='games-viewset'),
    path('games/<int:pk>/', GamesViewSet.as_view({'get':'retrieve'}), name='game-viewset'),
    # GameSession urls
    path('gameSessions/', GameSessionViewSet.as_view({'get':'list','post':'create'}), name='gameSessions-viewset'),
    path('gameSessions/active/', GameSessionViewSet.as_view({'get':'retrieve','delete':'destroy'}), name='game-sessions-viewset'),
    # SessionDataPoint urls
    path('sessionDataPoints/', SessionDataPointViewSet.as_view({'post':'create'}), name='Pssion-data-points-viewset'),
    path('sessionDataPoints/<int:pk>/', SessionDataPointViewSet.as_view({'get':'list'}), name='session-data-points-viewset'),
]
