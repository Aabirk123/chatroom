from attr import field
from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only':True}}

    def validate(self, attrs):
        return super().validate(attrs)


        
