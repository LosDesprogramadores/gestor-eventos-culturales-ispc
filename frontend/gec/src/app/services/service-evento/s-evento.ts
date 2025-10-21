import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { ClassEvento } from '../../model/evento';
import { EventoForm } from '../../model/eventoForm';
import { Evento } from '../../view/home/evento/evento';
import { Auth } from '../service-autenticacion/auth.service';
import { SAlert } from '../service-alert/s-alert';

@Injectable({
  providedIn: 'root'
})
export class SEvento {
  private URL: string = 'http://127.0.0.1:8000/api/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  uid?: number | null;
  constructor(private http: HttpClient,
    private auth: Auth,
    private alertas: SAlert
  ) {}

  // Obtener todos los eventos que aún no finalizaron
  obtenerEventos(): Observable<ClassEvento[]> {
    const hoy = new Date();
    const hoySoloFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    return this.http.get<ClassEvento[]>(this.URL + "eventos/").pipe(
      map(data =>
        data
          .map(item => new ClassEvento(item))
          .filter(evento => {
            const fechaFin = new Date(evento.getFechaFinInscripcion());
            const fechaFinSoloFecha = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());
            return fechaFinSoloFecha >= hoySoloFecha;
          })
      )
    );
  }

  // Obtener eventos distintos de un gestor específico
  obtenerEventosDistintosDelGestor(gestorId: number): Observable<ClassEvento[]> {
    const hoy = new Date();
    const hoySoloFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    return this.http.get<ClassEvento[]>(this.URL + "eventos/").pipe(
      map(data =>
        data
          .map(item => new ClassEvento(item))
          .filter(evento => {
            const fechaFin = new Date(evento.getFechaFinInscripcion());
            const fechaFinSoloFecha = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());
            return fechaFinSoloFecha >= hoySoloFecha && evento.getUsuario() !== gestorId;
          })
      )
    );
  }

  // Obtener todos los eventos (sin filtro de fecha)
  obtenerEventosMisEventos(): Observable<ClassEvento[]> {
    return this.http.get<ClassEvento[]>(this.URL + "eventos/").pipe(
      map(data => data.map(item => new ClassEvento(item)))
    );
  }

  // Obtener eventos de un gestor
  obtenerEventosDelGestor(gestorId: number): Observable<ClassEvento[]> {
    return this.obtenerEventos().pipe(
      map(eventos => eventos.filter(ev => Number(ev.getUsuario()) === gestorId))
    );
  }

  // Crear un nuevo evento
  crearEvento(evento: EventoForm): Observable<ClassEvento> {
    console.log("El usuario " + evento?.usuario);
    return this.http.post<ClassEvento>(this.URL + "eventos/", evento, { headers: this.headers }).pipe(
      map(data => new ClassEvento(data))
    );
  }

  // Eliminar un evento por su id
  eliminarEventoPorIdEvento(id_evento: string): Observable<void> {
    const url = `${this.URL}eventos/${id_evento}/`;
    return this.http.delete<void>(url);
  }

  // Actualizar evento (PATCH)
  actualizarEvento(evento: { id: number, inscriptos: number }): Observable<ClassEvento> {
    const url = `${this.URL}eventos/${evento.id}/`;
    console.log("Datos a actualizar:", evento);
    return this.http.patch<ClassEvento>(url, evento, { headers: this.headers }).pipe(
      map(data => new ClassEvento(data))
    );
  }

  // Obtener un evento específico
  obtenerUnEvento(id_evento: number): Observable<ClassEvento> {
    const url = `${this.URL}eventos/${id_evento}/`;
    return this.http.get<ClassEvento>(url).pipe(
      map(data => new ClassEvento(data))
    );
  }

   validacionEvento(evento: ClassEvento): number {
     if (this.auth.role === 'ANON') {
          this.alertas.mensajeUsuario(this.auth.usuarioLogueadoId() ?? 0); 
      return -1;
    }
    
    const currentUid = this.auth.usuarioLogueadoId();
    
    if (!currentUid) {
      this.alertas.mensajeUsuario(currentUid!);
      return -1;
    }
    this.uid = currentUid; 
      if (this.uid === evento.getUsuario()) {
      this.alertas.mensajeErrorEventoPropio();
      return -1;
    }
    return this.uid; 
}


}
