import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../../services/service-autenticacion/auth.service';

@Component({
  selector: 'app-nav-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-home.html',
  styleUrls: ['./nav-home.css']  
})
export class NavHome {
  auth = inject(Auth);         
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
