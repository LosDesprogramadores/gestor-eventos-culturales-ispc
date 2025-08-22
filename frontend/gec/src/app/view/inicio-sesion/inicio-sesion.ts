import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavHome } from '../home/nav-home/nav-home';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterModule],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css'
})
export class InicioSesion {

}
