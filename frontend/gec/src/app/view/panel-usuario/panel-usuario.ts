import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { NavHome } from '../home/nav-home/nav-home';

@Component({
  selector: 'app-panel-usuario',
  imports: [ Header, Footer, NavHome ],
  templateUrl: './panel-usuario.html',
  styleUrls: ['./panel-usuario.css']
})
export class PanelUsuarioComponent { }
