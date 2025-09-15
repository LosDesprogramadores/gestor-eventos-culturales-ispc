import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Banner } from '../banner/banner';
import { SEvento } from '../../../services/service-evento/s-evento';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClassEvento } from '../../../model/evento';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';

export interface Inscripcion {
  id?: any;             
  id_usuario: any;
  id_evento: any;
  fecha_inscripcion: any;
  id_estado: any;
}

@Component({
  selector: 'app-evento',
  imports: [RouterModule,Banner, CommonModule] ,
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})


export class Evento implements OnInit {
  creando = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' = 'success';
  mostrarMensaje: boolean = false;

   eventos$ : Observable<ClassEvento[]>;
    constructor(private serviceEvento : SEvento, private auth:Auth, private router:Router, private inscripciones:InscripcionService){
      this.eventos$ = this.serviceEvento.obtenerEventos();
    }
    
     ngOnInit(): void {
   }


  agregar(evento: ClassEvento): void {
    if(this.auth.role === 'ANON'){
     this.router.navigateByUrl('/inicio-sesion');
    }
    console.log(evento)
      const uid = this.auth.usuarioLogueadoId();
      if (!uid) return;

      const nueva: Inscripcion = {
        id_usuario: uid,
        id_evento: evento.$id_evento,
        fecha_inscripcion: new Date().toISOString().split('T')[0],
        id_estado: 1
      };
      
      this.inscripciones.addInscripcion(nueva).subscribe();
      this.tipoMensaje = 'success';
      this.mensaje = `Evento "${evento.$nombre}"Suscrito exitosamente!`;
      this.mostrarMensaje = true;
      setTimeout(() => this.mostrarMensaje = false, 2000);
    }
}
