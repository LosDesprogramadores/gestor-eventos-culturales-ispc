import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { DetalleEvento } from './view/home/detalle-evento/detalle-evento';
import { Evento } from './view/home/evento/evento';

export const routes: Routes = [
    {
        path: "home", 
        component:Home,
    children:[{path:'',component:Evento},
              {path:"detalle-evento/:id",component:DetalleEvento}
            ]},
    {path:"", redirectTo: "/home", pathMatch:"full" }

];
