from django.contrib import admin
from .models import User,Game,GameSession,SessionDataPoint

# Register your models here.

admin.site.register(User)
admin.site.register(Game)
admin.site.register(GameSession)
admin.site.register(SessionDataPoint)