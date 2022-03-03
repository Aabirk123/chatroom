from django.urls import path, include
from .views import ping

urlpatterns = [
    path('test/', ping)
]