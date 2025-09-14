import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { NavHome } from '../nav-home/nav-home';
import { HttpClientModule } from '@angular/common/http';

@Component( {
  selector: 'app-contacto',
  imports: [ HttpClientModule, ReactiveFormsModule, RouterModule, Header, NavHome, Footer ],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
} )
export class Contacto {
  form: FormGroup;


  constructor( private formBuilder: FormBuilder ) {

    this.form = this.formBuilder.group( {
      nombre: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      asunto: [ '', [ Validators.required ] ],
      mensaje: [ '', [ Validators.required, Validators.minLength( 10 ), Validators.maxLength( 250 ) ] ]
    } );
  }

  get nombre() {
    return this.form.get( 'nombre' );
  }
  get email() {
    return this.form.get( 'email' );
  }
  get asunto() {
    return this.form.get( 'asunto' );
  }
  get mensaje() {
    return this.form.get( 'mensaje' );
  }


  onSubmit() {
    if ( this.form.valid ) {
      // Primero, datos personales
      console.log( "form ok" );
      alert( 'Mensaje enviado con éxito.' );
      this.form.reset();

    } else {
      console.log( "form error" );
      this.form.markAllAsTouched();
    }
  }

}
