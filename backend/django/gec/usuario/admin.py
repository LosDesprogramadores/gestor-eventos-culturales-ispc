from django.contrib import admin
from .models import Usuario

# Aqui pueden registrar sus modelos para poder verlos en el admin de django
admin.site.register(Usuario)
