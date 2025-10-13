from django.contrib import admin
from usuario.models import Usuario
from evento.models import Evento
from datos.models import Datos


# Register your models here.
admin.site.register(Evento)
admin.site.register(Datos)