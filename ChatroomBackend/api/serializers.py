import profile
from pyexpat import model
from attr import fields
from rest_framework import serializers
from .models import Room, Message
from users.models import Profile
from django.contrib.auth.models import User

class RoomSerializer(serializers.ModelSerializer):

    usernames = serializers.SerializerMethodField('get_member_names')
    last_message = serializers.SerializerMethodField('get_last_message')

    class Meta:
        model = Room
        fields = ('id','title','created', 'usernames', 'last_message')
   
    def get_member_names(self, room):

        username_list =[]
        room_object_members = room.members.all()
        for member in room_object_members:
            username_list.append(member.username)
        return username_list

    def get_last_message(self, room):
        last_message = room.message_set.latest('sent')
        return last_message.content


class MessageSerializer(serializers.ModelSerializer):

    user_sent = serializers.SerializerMethodField('get_message_user')
    profile_image = serializers.SerializerMethodField('get_profile_img_link')

    class Meta:
        model = Message
        fields = ('content', 'sent', 'user_sent','sender', 'id', 'profile_image')

    def get_message_user(self, message):
        return message.sender.username

    def get_profile_img_link(self, message):
        profile = Profile.objects.filter(user=message.sender)
        profile.filter(user=message.sender.id)
        print(profile[0].image)

