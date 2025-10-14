from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from evento.models import Evento
from evento.serializers import EventoSerializer
from rest_framework import status, permissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from django.http import Http404
from django.shortcuts import get_object_or_404


class EventoList(APIView):
    permission_classes = (permissions.AllowAny,)
    # Listar eventos

    def get(self, request, format=None):
        eventos = Evento.objects.all()
        serializer = EventoSerializer(eventos, many=True)
        return Response(serializer.data)

    # Crear evento
    def post(self, request, format=None):
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
     


class EventoDetail(APIView):
    permission_classes = (permissions.AllowAny,)

    # Metodo aux para obtener el objeto o lanzar 404

    def get_object(self, pk):
        try:
            return Evento.objects.get(pk=pk)
        except Evento.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        # Traer evento
        evento = self.get_object(pk)
        serializer = EventoSerializer(evento)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        # Actualizar evento
        evento = self.get_object(pk)
        serializer = EventoSerializer(evento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        # Borar evento
        evento = self.get_object(pk)
        evento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk, format=None):
        evento = self.get_object(pk)
        serializer = EventoSerializer(evento, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)