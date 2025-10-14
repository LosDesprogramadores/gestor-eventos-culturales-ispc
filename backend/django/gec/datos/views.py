from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from datos.models import Datos
from datos.serializers import DatosSerializer
from rest_framework import status, permissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from django.http import Http404


class DatosDetail(APIView):
    permission_classes = (permissions.AllowAny,)

    # Metodo aux para obtener el objeto o lanzar 404
    def get_object(self, pk):
        try:
            return Datos.objects.get(pk=pk)
        except Datos.DoesNotExist:
            raise Http404
            
    def get(self, request, pk=None, format=None):
        
        # 1. Caso de DETALLE: Si se proporciona un 'pk' en la URL
        if pk:
            # Traer solo un objeto
            datos = self.get_object(pk)
            serializer = DatosSerializer(datos)
        
        # 2. Caso de LISTA: Si no se proporciona 'pk'
        else:
            # Traer todos los objetos
            datos = Datos.objects.all()
            serializer = DatosSerializer(datos, many=True)
            
        return Response(serializer.data)
        
      
    def post(self, request):
        serializer = DatosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        # Actualizar datos
        datos = self.get_object(pk)
        serializer = DatosSerializer(datos, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        # Borar datos
        datos = self.get_object(pk)
        datos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

