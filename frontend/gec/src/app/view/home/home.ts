import { Component, OnInit, inject } from '@angular/core';

import { NavHome } from './nav-home/nav-home';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Evento } from './evento/evento';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../services/service-autenticacion/auth.service';


@Component( {
  selector: 'app-home',
  imports: [ NavHome, Header, Footer, RouterModule ],
  templateUrl: './home.html',
  styleUrl: './home.css'
} )
export class Home {
  auth = inject( Auth );
  private router = inject( Router );

  logout() {
    this.auth.logout();
    this.router.navigateByUrl( '/home' );
  }

}