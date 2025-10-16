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

  private showAlert(mensaje : Mensaje){
    this.alertSource.next(mensaje);
  }
  

  mensajeUsuario(id : number):Mensaje{
     if(!id){
      const mensaje =new Mensaje("Usuario no logueado", 1000, "danger",true);
      this.showAlert(mensaje);
      return mensaje;
     }
     return new Mensaje();
     
  }

  mensajeInscripcion():Mensaje{
      const mensaje =new Mensaje("Inscripción Exitosa!!!", 2000, "success",true);
      this.showAlert(mensaje);
      return mensaje;     
  }

  mensajeEliminacionInscripcion():Mensaje{
      const mensaje =new Mensaje("Inscripción Eliminada!!!", 2000, "success",true);
      this.showAlert(mensaje);
      return mensaje;     
  }

  mensajeErrorInscripcion():Mensaje{
      const mensaje =new Mensaje("Error al Inscribirse!!!", 2000, "danger",true);
      this.showAlert(mensaje);
      return mensaje;     
  }


   mensajeExistenciaDeInscripcion():Mensaje{
      const mensaje =new Mensaje("Ya está subscripto al evento!!!", 2000, "danger",true);
      this.showAlert(mensaje);
      return mensaje;     
  }

}
