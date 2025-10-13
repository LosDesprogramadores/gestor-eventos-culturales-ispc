from rest_framework import serializers
from usuario.models import Usuario
from datos.models import Datos


class DatosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datos
        fields = '__all__'
