import { Routes } from '@angular/router';
import { Home } from './view/principal/home/home';
import { QuienesSomos } from './view/quienes-somos/quienes-somos';


export const routes: Routes = [
  { path: "home", component: Home },
  { path: "quienes-somos", component: QuienesSomos },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];
