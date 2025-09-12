import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Banner } from '../banner/banner';
import { SEvento } from '../../../services/service-evento/s-evento';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClassEvento } from '../../../model/evento';

@Component({
  selector: 'app-evento',
  imports: [RouterModule,Banner, CommonModule] ,
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})
export class Evento implements OnInit {
   eventos$ : Observable<ClassEvento[]>;
    constructor(private serviceEvento : SEvento){
      this.eventos$ = this.serviceEvento.obtenerEventos();
    }
    
     ngOnInit(): void {
   }


}
