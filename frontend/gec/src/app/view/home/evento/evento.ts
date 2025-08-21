import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Banner } from '../banner/banner';

@Component({
  selector: 'app-evento',
  imports: [RouterModule,Banner] ,
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})
export class Evento {

}
