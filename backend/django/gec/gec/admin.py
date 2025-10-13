from django.contrib import admin
from inscripcion.models import Inscripcion
from evento.models import Evento
from inscripcion.models import Inscripcion


# Aqui pueden registrar sus modelos para poder verlos en el admin de django
admin.site.register(Evento)
admin.site.register(Inscripcion)
