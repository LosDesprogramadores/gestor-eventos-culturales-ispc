from rest_framework import serializers
from .models import Inscripcion
from evento.serializers import EventoSerializer 


class InscripcionSerializer(serializers.ModelSerializer):
    
    _id_usuario = serializers.IntegerField(source='id_usuario')

    _evento = EventoSerializer(source='evento', read_only=True)
    
    _fecha_inscripcion = serializers.DateTimeField(source='fecha_inscripcion') 
    
  
    _id_estado = serializers.IntegerField(source='id_estado')

    class Meta:
        model = Inscripcion
        fields = (
            'id', 
            '_id_usuario', 
            '_evento', 
            '_fecha_inscripcion', 
            '_id_estado'
        )
