import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mensaje } from '../../model/mensaje';

@Injectable({
  providedIn: 'root'
})
export class SAlert {
  private alertSource= new Subject<Mensaje>();
  alert$ = this.alertSource.asObservable();

  constructor(){}

  showAlert(mensaje : Mensaje){
    this.alertSource.next(mensaje);
  }
}
