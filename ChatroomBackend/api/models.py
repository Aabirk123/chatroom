from time import time
from django.db import models
from django.dispatch import receiver
from django.utils  import timezone
from django.contrib.auth.models import User
from django.db.models.signals import m2m_changed



class Room(models.Model):   
    title = models.CharField(max_length=200, blank=True)
    created = models.DateTimeField(default=timezone.now)
    members = models.ManyToManyField(User, blank=False)

    def __str__(self):
        return self.title
    
    
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    content = models.TextField(max_length=3000, blank=False)
    sent = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.sender.username + " " + str(self.room.id) + " " + str(self.id)

    class Meta:
        ordering = ['sent']


@receiver(m2m_changed, sender=Room)
def m2m_change_room(sender, instance, created, **kwargs):
    if not instance.memebers.exist():
        instance.delete()
