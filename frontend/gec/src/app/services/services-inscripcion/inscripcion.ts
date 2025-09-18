import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../service-autenticacion/auth.service';
import { ClassEvento } from '../../model/evento';
import { Inscripcion } from '../../model/inscripcion';




@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = 'http://localhost:3000/inscripciones';

  constructor(private http: HttpClient, private auth: Auth) {}

  
  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  
  getInscripcionesByUsuario(id_usuario: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}?id_usuario=${id_usuario}`);
  }

  obtenerInscipciones(id_usuario: number){
     this.getInscripcionesByUsuario(id_usuario).subscribe();
  }
  
  private addInscripcion(insc: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, insc);
  }

  
  deleteInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 /*  agregar(evento: ClassEvento): void {
      const uid = this.auth.usuarioLogueadoId();
      if (!uid) return;

      const nueva= new Inscripcion (uid,evento.$id_evento,new Date().toISOString().split('T')[0],1)
       console.log(nueva)
      this.addInscripcion(nueva).subscribe();
  } */
  
  registrarInscripcion(evento:ClassEvento):boolean{

     const inscripcion = new Inscripcion (this.auth.session.user?.id ?? 0 ,evento.$id_evento,new Date().toISOString().split('T')[0],1); 
     this.addInscripcion(inscripcion).subscribe();
      return true;
  }


}


