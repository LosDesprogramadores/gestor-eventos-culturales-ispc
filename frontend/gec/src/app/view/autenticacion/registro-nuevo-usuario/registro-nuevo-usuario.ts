import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Header } from '../../../shared/header/header';
import { NavHome } from '../../home/nav-home/nav-home';
import { Footer } from '../../../shared/footer/footer';
import { HttpClientModule } from '@angular/common/http';
import { SRegistro } from '../../../services/service-registro/s-registro';

@Component({
  selector: 'app-registro-nuevo-usuario',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule, RouterModule, Header, NavHome, Footer],
  templateUrl: './registro-nuevo-usuario.html',
  styleUrl: './registro-nuevo-usuario.css'
})

export class RegistroNuevoUsuario {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: SRegistro
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
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

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  }

  onSubmit() {
  if (this.form.valid) {
    // Primero, datos personales
    const datos = {
      nombre: this.nombre?.value,
      apellido: this.apellido?.value,
      direccion: '', 
      celular: ''
    };

    this.registroService.registrarDatos(datos).subscribe({
      next: (resDatos) => {
        // Luego, usuario con el id_datos recibido
        const nuevoUsuario = {
          email: this.email?.value,
          password: this.password?.value,
          fechaRegistro: new Date().toISOString().split('T')[0], // formato yyyy-mm-dd
          cuentaActiva: true,
          id_rol: 2, 
          id_datos: resDatos.id_datos
        };

        this.registroService.registrarUsuario(nuevoUsuario).subscribe({
          next: (resUsuario) => {
            alert('Usuario registrado con éxito.');
            this.form.reset();
          },
          error: (err) => {
            console.error('Error registrando usuario', err);
            alert('Error al registrar usuario.');
          }
        });
      },
      error: (err) => {
        console.error('Error registrando datos', err);
        alert('Error al registrar datos personales.');
      }
    });
  } else {
    this.form.markAllAsTouched();
  }
}

}