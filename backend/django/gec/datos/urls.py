from django.urls import path
from .views import DatosDetail

urlpatterns = [

    # Lista y crea datos
    path('datos/', DatosDetail.as_view(), name='datos-list'),

    # Actualizar y borrar datos
    path('datos/<int:pk>/', DatosDetail.as_view(), name='datos-detail'),
]
