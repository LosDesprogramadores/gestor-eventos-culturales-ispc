from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework import status, permissions
from django.http import HttpResponse

# Librerias de auth
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from django.contrib.auth import authenticate, login


def saludo(request):
    return HttpResponse("A codeaar peerrooos...")


@method_decorator(csrf_exempt, name='dispatch')
class UsuarioView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, pk=None):
        if pk:
            usuario = get_object_or_404(Usuario, pk=pk)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)
        else:
            usuarios = Usuario.objects.all()
            serializer = UsuarioSerializer(usuarios, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# desactivando proteccion


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            # login(request, user)
            return Response(
                {"message": "Inicio de sesión exitoso", "user_id": user.id},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "Email o contraseña incorrectos"},
                status=status.HTTP_401_UNAUTHORIZED
            )
