import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Contacto } from './view/home/contacto/contacto';
import { Evento } from './view/home/evento/evento';
import { DetalleEvento } from './view/home/detalle-evento/detalle-evento';
import { QuienesSomos } from './view/home/quienes-somos/quienes-somos';
import { InicioSesionComponent  } from './view/autenticacion/inicio-sesion/inicio-sesion';
import { RegistroNuevoUsuario } from './view/autenticacion/registro-nuevo-usuario/registro-nuevo-usuario';
import { PanelUsuarioComponent } from './view/paneles-usuarios/panel-usuario/panel-usuario';

export const routes: Routes = [
  {
    path: "home", component: Home,
    children:[
      { path:"", component: Evento },
      { path:"evento/detalle-evento/:id", component: DetalleEvento }
    ]
  },
  { path: "contacto", component: Contacto },
  { path: "inicio-sesion", component: InicioSesionComponent },
  { path: "quienes-somos", component: QuienesSomos },
  { path: "registro-nuevo-usuario", component: RegistroNuevoUsuario },

  { path: "panel-usuario", component: PanelUsuarioComponent }, 

  { path: "", redirectTo: "/home", pathMatch: "full" }
];
