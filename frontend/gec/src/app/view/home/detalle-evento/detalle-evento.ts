import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { ClassEvento } from '../../../model/evento';



@Component({
  selector: 'app-detalle-evento',
  imports: [RouterModule],
  templateUrl: './detalle-evento.html',
  styleUrl: './detalle-evento.css'
})
export class DetalleEvento implements OnInit{
inscribirse(arg0: number|undefined) {
throw new Error('Method not implemented.');
}

  constructor( private route: ActivatedRoute, 
    ){}
 
   ngOnInit(): void {
   
  }
}