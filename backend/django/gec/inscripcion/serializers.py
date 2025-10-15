from rest_framework import serializers
from .models import Inscripcion
from evento.serializers import EventoSerializer 


class InscripcionSerializer(serializers.ModelSerializer):
    
    # --- Campos de SALIDA (GET) ---
    idUsuario = serializers.IntegerField(source='usuario.id', read_only=True) 
    
    # 1. CAMPO FALTANTE: Campo anidado para el GET, marcado como read_only
    evento = EventoSerializer(read_only=True)
    
    fechaInscripcion = serializers.DateTimeField(source='fecha_inscripcion', read_only=True)
    idEstado = serializers.IntegerField(source='estado', read_only=True)
    
    # --- Campos de ENTRADA (POST/PUT) ---
    
    # Campo de entrada para el usuario
    usuario = serializers.PrimaryKeyRelatedField(
        queryset=Inscripcion.usuario.field.related_model.objects.all(), 
        write_only=True
    )
    
    # 2. ÚNICA DEFINICIÓN: Campo de ENTRADA para el ID del Evento
    # Usamos evento_id para el JSON de entrada y mapeamos a 'evento' en el modelo
    evento_id = serializers.PrimaryKeyRelatedField(
        source='evento',  
        queryset=Inscripcion.evento.field.related_model.objects.all(), 
        write_only=True
    )

    fecha_inscripcion = serializers.DateTimeField(write_only=True)
    estado = serializers.IntegerField(write_only=True)
    
    # 3. CAMPOS DE ENTRADA RESTANTES (OBLIGATORIOS EN EL JSON)
    fecha_inicio_inscripcion = serializers.DateField(write_only=True) 
    fecha_fin_inscripcion = serializers.DateField(write_only=True)


    class Meta:
        model = Inscripcion
        fields = (
            'id', 
            
            # SALIDA (GET)
            'idUsuario', 
            'evento', # Ya definido arriba como campo de SALIDA (read_only=True)
            'fechaInscripcion', 
            'idEstado',
            
            # ENTRADA (POST/PUT)
            'usuario', 
            'evento_id', 
            'fecha_inscripcion', 
            'estado',
            'fecha_inicio_inscripcion', # Ahora el Serializer sabe que debe buscar este campo
            'fecha_fin_inscripcion'    # Ahora el Serializer sabe que debe buscar este campo
        )