import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.maxLength(15)]], 
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      console.log('Formulario válido:', this.contactoForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
