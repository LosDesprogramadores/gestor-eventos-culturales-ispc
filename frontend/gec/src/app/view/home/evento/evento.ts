import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Banner } from '../banner/banner';
import { EventosService, IEvento } from '../../../services/galeria';

@Component({
  selector: 'app-evento',
  imports: [RouterModule,Banner] ,
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})
export class Evento {
   galeria : IEvento[] = [];
    constructor(private eventoService : EventosService){}
  
    ngOnInit(): void {
      this.galeria = this.eventoService.getEventos();
    }

}
