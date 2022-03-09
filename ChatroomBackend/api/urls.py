from django.urls import path, include
from .views import ViewRooms, MessageView

urlpatterns = [
    path('rooms/', ViewRooms.as_view(), name='RoomList'),
    path('create-message/',MessageView.as_view(), name="CreateMessage")
]