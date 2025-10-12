import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Banner } from '../banner/banner';
import { SEvento } from '../../../services/service-evento/s-evento';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClassEvento } from '../../../model/evento';
import { Auth } from '../../../services/service-autenticacion/auth.service';

@Component({
  selector: 'app-evento',
  imports: [RouterModule,Banner, CommonModule] ,
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})
export class Evento implements OnInit {
   eventos$ : Observable<ClassEvento[]>;
    constructor(private serviceEvento : SEvento, private router : Router, private aut : Auth){
      this.eventos$ = this.serviceEvento.obtenerEventos();
    }
    
     ngOnInit(): void {
   }

   existeUsuario(){

    if(this.aut.role == 'ANON'){
      this.router.navigateByUrl("/inicio-sesion");
    }

   }


}
