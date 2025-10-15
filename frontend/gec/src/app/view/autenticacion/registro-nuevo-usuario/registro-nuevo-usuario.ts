import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { SRegistro } from '../../../services/service-registro/s-registro';
import { classUsuario } from '../../../model/usuario';
import { ClassDatos } from '../../../model/datos';
import { EnumRol } from '../../../model/rol';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../../../shared/header/header';
import { NavHome } from '../../home/nav-home/nav-home';
import { Footer } from '../../../shared/footer/footer';

@Component({
  selector: 'app-registro-nuevo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, Header, NavHome, Footer],
  templateUrl: './registro-nuevo-usuario.html',
  styleUrl: './registro-nuevo-usuario.css'
})
export class RegistroNuevoUsuario {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: SRegistro,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      rol: [EnumRol.USUARIO, [Validators.required]] 
    }, {
      validator: this.passwordMatchValidator
    });
  }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get rol() { return this.form.get('rol'); }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  }

  // 🔹 Lógica de registro
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.value;

    // envia solo la estructura esperada por django
    const datosFinales = {
        email: formValues.email,
        password: formValues.password,
        id_rol: formValues.rol 
    };


    
    this.registroService.registrarUsuario(datosFinales).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/inicio-sesion']);
      },
      error: (err) => {
        console.error('Error al registrar usuario', err);
        alert('Hubo un error al registrar el usuario.');
      }
    });
  }
}
