import { Component, OnInit } from '@angular/core';
import { EventosService, IEvento } from '../../../services/galeria';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Auth } from '../../../services/service-autenticacion/auth.service';


@Component({
  selector: 'app-detalle-evento',
  imports: [RouterModule],
  templateUrl: './detalle-evento.html',
  styleUrl: './detalle-evento.css'
})
export class DetalleEvento implements OnInit{

  evento : IEvento | undefined;
  
  constructor( private route: ActivatedRoute, 
    private eventosService: EventosService ){}
 
   ngOnInit(): void {
    // Suscríbete a los parámetros de la URL para obtener el 'id'
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id !== null) {
        // Convierte el ID a número y busca el evento en el servicio
        const eventos = this.eventosService.getEventos();
        this.evento = eventos[+id]; // El '+' convierte el string 'id' a número
        
        if (!this.evento) {
          console.error('No se encontró el evento con el ID:', id);
        }
      }
    });
  }
}
