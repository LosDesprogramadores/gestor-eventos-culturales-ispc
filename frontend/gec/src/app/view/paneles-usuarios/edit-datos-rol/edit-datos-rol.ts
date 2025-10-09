import { Component } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { NavHome } from '../../home/nav-home/nav-home';
import { Footer } from '../../../shared/footer/footer';

@Component({
  selector: 'app-edit-datos-rol',
  standalone: true,
  imports: [Header, NavHome, Footer ],
  templateUrl: './edit-datos-rol.html',
  styleUrls: ['./edit-datos-rol.css']

})
export class EditDatosRol {

}
