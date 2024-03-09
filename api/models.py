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

    profile = models.ImageField(_("Profile"),upload_to=upload_profile,null=True,blank=True)
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["name","phone"]

    def __str__(self):
        return self.name