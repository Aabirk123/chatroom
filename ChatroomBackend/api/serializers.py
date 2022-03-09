from rest_framework import serializers
from .models import Room, Message

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'title','created', 'members')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('sender', 'room', 'content')