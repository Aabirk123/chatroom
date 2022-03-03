from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import RegisterUserSerializer

from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            reg_serializer.save()
            return Response({"action":"complete"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"action":"failed"}, status=status.HTTP_400_BAD_REQUEST)

class BlackListTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
