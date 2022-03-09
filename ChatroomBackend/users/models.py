from distutils.command.upload import upload
from email.policy import default
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save

def upload_to(instance, filename):
    return 'profiles/{filename}'.format(filename=filename)

# Create your models here.
class Profile(models.Model):
    created = models.DateTimeField(default=timezone.now)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=300)
    image = models.ImageField(upload_to=upload_to, default="profiles/default.jpg")

    def __str__(self):
        return self.user.username + " profile"


def create_profile(sender, **kwargs):
    if kwargs['created']:
        profile = Profile.objects.create(user=kwargs['instance'])

post_save.connect(create_profile, sender=User)
    