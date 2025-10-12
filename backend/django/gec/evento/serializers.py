from rest_framework import serializers
from usuario.models import Usuario
from evento.models import Evento


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'
