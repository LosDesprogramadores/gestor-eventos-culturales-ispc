from django.urls import path
from .views import UsuarioView, LoginView

urlpatterns = [
    # usuarios/   solo con get trae todos los usuarios
    # usuarios/   solo con post crea el usuario, pide un email y password
    # usuarios/<int:pk>/   trae los datos de 1 usuario en particular
    path('usuarios/', UsuarioView.as_view(), name='usuario-list-create'),
    path('usuarios/<int:pk>/', UsuarioView.as_view(), name='usuario-detail'),
    path('usuarios/login/', LoginView.as_view(), name='api-login'),
]
