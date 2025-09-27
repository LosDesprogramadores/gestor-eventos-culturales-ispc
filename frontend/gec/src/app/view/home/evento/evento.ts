import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Banner } from '../banner/banner';
import { SEvento } from '../../../services/service-evento/s-evento';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClassEvento } from '../../../model/evento';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { SAlert } from '../../../services/service-alert/s-alert';
import { Mensaje } from '../../../model/mensaje';


@Component({
  selector: 'app-evento',
  imports: [RouterModule, Banner, CommonModule],
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})


export class Evento implements OnInit {
  
  mensaje : Mensaje = new Mensaje();
  eventos$: Observable<ClassEvento[]>;

  constructor(private serviceEvento: SEvento, private auth: Auth, private router: Router, private inscripciones: InscripcionService, private alertas: SAlert) {
    this.eventos$ = this.serviceEvento.obtenerEventos();
  }

  ngOnInit(): void {
  }


  agregar(evento: ClassEvento): void {
  
    if (this.auth.role === 'ANON') {
        this.alertas.mensajeUsuario(this.auth.usuarioLogueadoId() ?? 0);
  
    }
    const uid = this.auth.usuarioLogueadoId();
    if (!uid) return;
    
     
     this.inscripciones.registrarInscripcion(evento, uid);
   
    
  

  }
}
