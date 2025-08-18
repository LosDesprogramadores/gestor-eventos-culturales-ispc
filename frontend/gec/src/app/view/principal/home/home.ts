import { Component } from '@angular/core';
import { NavHome } from "../nav-home/nav-home";
import { Header } from "../../../shared/header/header";
import { Footer } from "../../../shared/footer/footer";
import { Evento } from '../evento/evento';


@Component({
  selector: 'app-home',
  imports: [NavHome, Header, Footer,Evento],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
