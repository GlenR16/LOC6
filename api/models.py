import re
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
import uuid

def upload_profile(instance,filename):
    return f"profiles/{uuid.uuid4().hex}.{filename.split('.')[-1]}"

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email Address"),unique=True,max_length=127)
    name = models.CharField(_("Name"),max_length=255)
    phone = models.CharField(_("Phone"),max_length=15,unique=True,validators=[RegexValidator(r'^\d{9,15}$')])
    interests = models.TextField(_("Interests"),default="")

    profile = models.ImageField(_("Profile"),upload_to=upload_profile,null=True,blank=True)
    games = models.ManyToManyField("Game",related_name="users",blank=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["name","phone"]

    def __str__(self):
        return self.name
    
    def add_interest(self,interest):
        self.interests = f"{self.interests},{interest}"
        self.save()

    def remove_interest(self,interest):
        self.interests = re.sub(f",{interest}",'',self.interests)
        self.save()
    
class Game(models.Model):
    name = models.CharField(_("Name"),max_length=255)
    description = models.TextField(_("Description"))
    tags = models.CharField(_("Tags"),max_length=255,default="")
    url = models.URLField(_("URL"))

    image = models.ImageField(_("Image"),upload_to="games",null=True,blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def add_tag(self,tag):
        self.tags = f"{self.tags},{tag}"
        self.save()

    def remove_tag(self,tag):
        self.tags = re.sub(f",{tag}",'',self.tags)
        self.save()
    
class GameSession(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="game_sessions")
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name} - {self.created_at}"
    
class SessionDataPoint(models.Model):
    session = models.ForeignKey(GameSession,on_delete=models.CASCADE,related_name="data_points")
    game = models.ForeignKey(Game,on_delete=models.CASCADE,related_name="data_points")
    active_time = models.FloatField(_("Active Time"))
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.session.user.name} - {self.game.name} - {self.active_time}"
    