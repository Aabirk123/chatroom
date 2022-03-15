from django.urls import path, include
from .views import ViewRooms

urlpatterns = [
    path('rooms/', ViewRooms.as_view(), name='RoomList'),
]