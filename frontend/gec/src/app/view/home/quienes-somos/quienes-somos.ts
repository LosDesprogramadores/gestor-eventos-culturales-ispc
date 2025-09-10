import { Component } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { NavHome } from '../nav-home/nav-home';

@Component( {
  selector: 'app-quienes-somos',
  imports: [ Header, Footer, NavHome ],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css'
} )
export class QuienesSomos {

}
