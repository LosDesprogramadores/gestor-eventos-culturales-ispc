import { Routes } from '@angular/router';
import { Home } from './view/home/home';

export const routes: Routes = [
    {path: "home", component:Home},
    {path:"", redirectTo: "/home", pathMatch:"full" }

];
