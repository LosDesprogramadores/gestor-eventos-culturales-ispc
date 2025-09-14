import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Evento {
  id_evento: number;
  nombre: string;
  fechaHoraEvento?: string;
  capacidad?: number;
  imagen?: string;
  fechaInicioInscripcion?: string;
  fechaFinInscripcion?: string;
  ubicacion?: string;
  estado?: number;
  gestor?: number;
  categoria?: number;
  [k: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl).pipe(
      map(list =>
        list.map(ev => ({
          ...ev,
          categoria: (ev as any).categoria ?? (ev as any)[' categoria'] ?? ev.categoria
        }))
      )
    );
  }

  
  getEventoById(id_evento: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id_evento}`);
  }
}
