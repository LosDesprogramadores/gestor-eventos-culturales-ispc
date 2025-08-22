import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Contacto } from './view/contacto/contacto';
import { InicioSesion } from './view/inicio-sesion/inicio-sesion';
import { QuienesSomos } from './view/quienes-somos/quienes-somos';
import { Evento } from './view/home/evento/evento';
import { DetalleEvento } from './view/home/detalle-evento/detalle-evento';
import { RegistroNuevoUsuario } from './view/registro-nuevo-usuario/registro-nuevo-usuario';
import { PanelUsuarioComponent } from './view/panel-usuario/panel-usuario'; 
export const routes: Routes = [
  {
    path: "home", component: Home,
    children:[
      { path:"", component: Evento },
      { path:"evento/detalle-evento/:id", component: DetalleEvento }
    ]
  },
  { path: "contacto", component: Contacto },
  { path: "inicio-sesion", component: InicioSesion },
  { path: "quienes-somos", component: QuienesSomos },
  { path: "registro-nuevo-usuario", component: RegistroNuevoUsuario },

  { path: "panel-usuario", component: PanelUsuarioComponent }, 

  { path: "", redirectTo: "/home", pathMatch: "full" }
];
