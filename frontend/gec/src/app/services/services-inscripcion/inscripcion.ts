import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  constructor(private http: HttpClient) {}

  
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
}
