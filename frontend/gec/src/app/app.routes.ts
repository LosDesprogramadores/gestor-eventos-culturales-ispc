import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { DetalleEvento } from './view/home/detalle-evento/detalle-evento';
import { Evento } from './view/home/evento/evento';

export const routes: Routes = [
    {
        path: "gec", 
        component:Home,
    children:[{path:'',component:Evento},
              {path:"detalle-evento",component:DetalleEvento}
            ]},
    {path:"", redirectTo: "/gec", pathMatch:"full" }

];
