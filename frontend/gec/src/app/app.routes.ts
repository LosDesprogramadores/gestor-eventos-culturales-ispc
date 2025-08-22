import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Contacto } from './view/contacto/contacto';
import { InicioSesion } from './view/inicio-sesion/inicio-sesion';
import { QuienesSomos } from './view/quienes-somos/quienes-somos';


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
  { path: 'quienes-somos', component: QuienesSomos },
  { path: "", redirectTo: "/home", pathMatch: "full" }

];
