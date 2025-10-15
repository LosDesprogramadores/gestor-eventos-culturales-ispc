from django.urls import path
from .views import InscripcionList, InscripcionDetail, InscripcionListByUsuario

urlpatterns = [
    # Lista y crea inscripciones
    path('inscripciones/', InscripcionList.as_view(), name='inscripcion-list'),

    # Detalle, actualizar y borrar inscripción
    path('inscripciones/<int:pk>/', InscripcionDetail.as_view(), name='inscripcion-detail'),

   
    path('inscripciones/usuario/<int:uid>/', InscripcionListByUsuario.as_view()),
]
