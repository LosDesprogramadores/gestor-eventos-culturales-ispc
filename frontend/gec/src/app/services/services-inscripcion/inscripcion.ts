import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../service-autenticacion/auth.service';
import { ClassEvento } from '../../model/evento';

export interface Inscripcion {
  id?: number;             
  id_usuario: number;
  id_evento: number;
  fecha_inscripcion: string;
  id_estado: number;
}

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

  
  addInscripcion(insc: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, insc);
  }

  
  deleteInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  agregar(evento: ClassEvento): void {
      const uid = this.auth.usuarioLogueadoId();
      if (!uid) return;

      const nueva: Inscripcion = {
        id_usuario: uid,
        id_evento: evento.$id_evento,
        fecha_inscripcion: new Date().toISOString().split('T')[0],
        id_estado: 1
      };
      console.log(nueva)
      this.addInscripcion(nueva).subscribe();
  }
}


