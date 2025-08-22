import { Component } from '@angular/core';
import { NavHome } from '../home/nav-home/nav-home';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-nuevo-usuario',
  imports: [RouterModule, Header, NavHome, Footer],
  templateUrl: './registro-nuevo-usuario.html',
  styleUrl: './registro-nuevo-usuario.css'
})
export class RegistroNuevoUsuario {

}
