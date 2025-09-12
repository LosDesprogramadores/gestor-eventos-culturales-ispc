import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Header } from '../../../shared/header/header';
import { NavHome } from '../../home/nav-home/nav-home';
import { Footer } from '../../../shared/footer/footer';

@Component({
  selector: 'app-registro-nuevo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, Header, NavHome, Footer],
  templateUrl: './registro-nuevo-usuario.html',
  styleUrl: './registro-nuevo-usuario.css'
})

export class RegistroNuevoUsuario {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  
  get password() {
    return this.form.get('password');
  }


  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get email() {
    return this.form.get('email');
  }

  
  //validador que está personalizado para saber si las contras coinciden 
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    // Retorna null si no hay controles para evitar errores
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    // Establece un error si las contras no coinciden
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Si coinciden, limpia el error
      confirmPasswordControl.setErrors(null);
      return null;
    }
  }
}