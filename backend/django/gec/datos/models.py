from django.db import models
from usuario.models import Usuario


class Datos (models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    empresa = models.CharField(max_length=250)
    cuil = models.CharField(max_length=250)
    id_usuario = models.ForeignKey(
        "usuario.Usuario", on_delete=models.CASCADE)

