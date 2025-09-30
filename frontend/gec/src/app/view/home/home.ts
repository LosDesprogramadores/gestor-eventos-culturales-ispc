import { Component, OnInit, inject } from '@angular/core';

import { NavHome } from './nav-home/nav-home';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Evento } from './evento/evento';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../services/service-autenticacion/auth.service';
import { SAlert } from '../../services/service-alert/s-alert';
import { Mensaje } from '../../model/mensaje';
import { CommonModule } from '@angular/common';



@Component( {
  selector: 'app-home',
  imports: [NavHome, Header, Footer, RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
} )
export class Home implements OnInit{
  auth = inject( Auth );
  private router = inject( Router );
  mensaje = new Mensaje();

  constructor(private alerta: SAlert){

  }
  ngOnInit(): void {
   this.alerta.alert$.subscribe((res:Mensaje)=> {
    this.mensaje.$showMessage = res.$showMessage;
    this.mensaje.$message = res.$message;
    this.mensaje.$tipoAlerta = res.$tipoAlerta;
     const tiempo = res.$time ?? 2000;
 
   setTimeout(()=>{ 
     this.mensaje.$showMessage = false;
    }, 
     tiempo)
      });
 
   }
  

  logout() {
    this.auth.logout();
    this.router.navigateByUrl( '/home' );
  }

}