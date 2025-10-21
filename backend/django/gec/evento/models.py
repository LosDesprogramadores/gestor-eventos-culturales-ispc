from django.db import models
from enum import IntEnum
from django.utils.translation import gettext_lazy as _
from usuario.models import Usuario


class CategoriaEvento(IntEnum):
    OTROS = 1
    TEATRO = 2
    COMEDIA = 3
    DRAMA = 4
    MUSICAL = 5
    ARTES = 6
    LITERATURA = 7
    CINE = 8
    TALLER = 9
    DANZA = 10
    ENCUENTRO = 11
    DIÁLOGO = 12


class EstadoEvento(IntEnum):
    HABILITADO = 1
    CANCELADO = 2
    RECHAZADO = 3
    PAUSADO = 4
    INSCRIPTO = 5
    ELIMINADO = 6


class Evento(models.Model):
    nombre = models.CharField(_(""), max_length=50)
    categoria = models.IntegerField(_("Categoría"), choices=[(
        c.value, c.name) for c in CategoriaEvento], default=CategoriaEvento.OTROS)
    fecha_hora_evento = models.DateTimeField()
    ubicacion = models.CharField(max_length=255)
    capacidad = models.IntegerField()
    inscriptos = models.IntegerField()
    descripcion = models.TextField()
    imagen = models.CharField(max_length=255)
    fecha_inicio_inscripcion = models.DateField()
    fecha_fin_inscripcion = models.DateField()

    estado = models.IntegerField(_("Estado"), choices=[(
        e.value, e.name) for e in EstadoEvento], default=EstadoEvento.HABILITADO)

    usuario = models.ForeignKey(
        "usuario.Usuario", verbose_name=_(""), on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'
