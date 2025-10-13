from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

# 1. Definir el Enum en Django
# Se usa models.IntegerChoices porque los valores de tu enum son números enteros.
class EnumRol(models.IntegerChoices):
    # La sintaxis es: NOMBRE_INTERNO = VALOR, 'Etiqueta legible'
    # Mantenemos los mismos valores que en tu frontend para consistencia.
    GESTOR = 1, 'Gestor'
    USUARIO = 2, 'Usuario'
    ADMINISTRADOR = 3, 'Administrador'

# 2. Tu UsuarioManager sigue igual
class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        # Asignamos el valor por defecto usando el Enum
        if 'id_rol' not in extra_fields:
            extra_fields['id_rol'] = EnumRol.USUARIO
            
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        # Es común que el superusuario sea un ADMINISTRADOR, lo ajustamos
        extra_fields.setdefault('id_rol', EnumRol.ADMINISTRADOR)
        return self.create_user(email, password, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    
    # CAMBIO CLAVE: Usamos IntegerField con el parámetro 'choices'
    id_rol = models.IntegerField(
        choices=EnumRol.choices, # Asigna las opciones de tu Enum
        default=EnumRol.USUARIO # Usa el Enum para el valor por defecto (2)
    )
    
    fecha_registro = models.DateField(auto_now_add=True)
    cuenta_activa = models.BooleanField(default=True)
    
    # atributos interntos de Django para los usuarios
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email} - {self.get_id_rol_display()}" # Muestra el nombre legible del rol

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'