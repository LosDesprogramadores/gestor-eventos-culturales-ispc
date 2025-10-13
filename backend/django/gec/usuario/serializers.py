from rest_framework import serializers
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Usuario
        fields = [
            'id',
            'email',
            'fecha_registro',
            'cuenta_activa',
            'id_rol',
            'is_active',
            'is_staff',
            'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario.objects.create_user(password=password, **validated_data)
        return user

    def validate_email(self, value):
        """Valida que el email no haya sido usado en el sistema"""
        if Usuario.objects.filter(email=value).exists():
            if not self.instance or self.instance.email != value:
                raise serializers.ValidationError(
                    "Ya existe un usuario con este email")
        return value
