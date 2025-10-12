from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Inscripcion
from .serializers import InscripcionSerializer

class InscripcionList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        inscripciones = Inscripcion.objects.all()
        serializer = InscripcionSerializer(inscripciones, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = InscripcionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InscripcionDetail(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        try:
            return Inscripcion.objects.get(pk=pk)
        except Inscripcion.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        inscripcion = self.get_object(pk)
        serializer = InscripcionSerializer(inscripcion)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        inscripcion = self.get_object(pk)
        serializer = InscripcionSerializer(inscripcion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        inscripcion = self.get_object(pk)
        inscripcion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
