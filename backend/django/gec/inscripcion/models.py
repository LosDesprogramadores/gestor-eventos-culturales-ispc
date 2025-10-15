from enum import IntEnum
from django.db import models
from django.utils.translation import gettext_lazy as _


class Estado(IntEnum):
    HABILITADO = 1
    CANCELADO = 2
    RECHAZADO = 3
    PAUSADO = 4
    INSCRIPTO = 5
    ELIMINADO = 6

       
class Inscripcion(models.Model):
    fecha_inscripcion = models.DateTimeField()
    fecha_inicio_inscripcion = models.DateField()
    fecha_fin_inscripcion = models.DateField()

    estado = models.IntegerField(_("Estado"), choices=[(
        e.value, e.name) for e in Estado], default=Estado.INSCRIPTO)

    usuario = models.ForeignKey(
        "usuario.Usuario", verbose_name=_(""), on_delete=models.CASCADE)
    
    evento = models.ForeignKey(
        "evento.Evento", verbose_name=_(""), on_delete=models.CASCADE)

    
    class Meta:
        verbose_name = 'Inscripcion'
        verbose_name_plural = 'Inscripciones'