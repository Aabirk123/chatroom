import imp
from os import stat
from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

def ping(request):
    return JsonResponse({'hello':5})
