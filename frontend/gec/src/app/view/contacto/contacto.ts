import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { NavHome } from '../home/nav-home/nav-home';

@Component({
  selector: 'app-contacto',
  imports: [RouterModule, Header, Footer, NavHome],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

}
