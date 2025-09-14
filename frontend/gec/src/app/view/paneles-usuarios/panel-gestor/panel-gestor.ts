import { Component, OnInit } from '@angular/core';
import { Footer } from "../../../shared/footer/footer";
import { NavHome } from '../../home/nav-home/nav-home';
import { Header } from '../../../shared/header/header';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { SEvento } from '../../../services/service-evento/s-evento';
import { ClassEvento } from '../../../model/evento';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-gestor',
  imports: [Footer,NavHome, Header, CommonModule],
  templateUrl: './panel-gestor.html',
  styleUrl: './panel-gestor.css'
})
export class PanelGestor implements OnInit {

  eventos$ : Observable<ClassEvento[]> | undefined;
  constructor(private sesion : Auth, private eventos : SEvento){}
    
  ngOnInit(): void {
    this.cargarEventos()   
  }


 private cargarEventos(){
    this.eventos$ = this.eventos.obtenerEventos().pipe( map(data => data.map((item: any) => new ClassEvento(item))),
      
      // 2. Usas un segundo `map` para filtrar el array resultante
      map(eventos => eventos.filter(evento => evento.$gestor === this.sesion.session.user?.id))
    );
 }
crearEvento() {
throw new Error('Method not implemented.');
}
editarEvento(_t15: any) {
throw new Error('Method not implemented.');
}
eliminarEvento(arg0: any) {
throw new Error('Method not implemented.');
}

  

}
