import { Component, OnInit } from '@angular/core';
import { NavHome } from './nav-home/nav-home'; 
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Evento } from './evento/evento';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavHome, Header, Footer,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home  {

 
}
