import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/service-autenticacion/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inicio-sesion.html',
  styleUrls: ['./inicio-sesion.css']
})
export class InicioSesionComponent {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: false
  });

  get email()    { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  async onSubmit() {
    this.error.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password, remember } = this.form.getRawValue();

    try {
      await this.auth.login(email, password);
      if (remember) {
        localStorage.setItem('gec.remember.email', email);
      } else {
        localStorage.removeItem('gec.remember.email');
      }

      this.router.navigateByUrl('/');
    } catch (e: any) {
      this.error.set(e?.message ?? 'No se pudo iniciar sesión.');
    } finally {
      this.loading.set(false);
    }
  }

  ngOnInit() {

    const remembered = localStorage.getItem('gec.remember.email');
    if (remembered) {
      this.form.patchValue({ email: remembered, remember: true });
    }
  }
}
