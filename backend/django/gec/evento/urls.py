from django.urls import path
from .views import EventoList, EventoDetail

urlpatterns = [

    # Lista y crea evento
    path('eventos/', EventoList.as_view(), name='evento-list'),

    # Actualizar y borrar evento
    path('eventos/<int:pk>/', EventoDetail.as_view(), name='evento-detail'),
]
