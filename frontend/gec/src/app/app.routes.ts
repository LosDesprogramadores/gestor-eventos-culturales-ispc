import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Contacto } from './view/contacto/contacto';
import { InicioSesion } from './view/inicio-sesion/inicio-sesion';


export const routes: Routes = [
  {
    path: "home", component: Home
  },
  {
    path: "contacto", component: Contacto
  },
  {
    path: "inicio-sesion", component: InicioSesion
  },
  { path: "", redirectTo: "/home", pathMatch: "full" }

];
