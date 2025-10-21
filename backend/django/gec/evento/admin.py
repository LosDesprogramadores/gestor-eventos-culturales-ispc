from django.contrib import admin
from usuario.models import Usuario
from evento.models import Evento
from datos.models import Datos
from inscripcion.models import Inscripcion


# Register your models here.
admin.site.register(Evento)
admin.site.register(Datos)
admin.site.register(Inscripcion)
