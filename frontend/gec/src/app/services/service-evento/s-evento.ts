import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ClassEvento } from '../../model/evento';
import { EventoForm } from '../../model/eventoForm';

@Injectable({
  providedIn: 'root'
})
export class SEvento {
  private URL: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  
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
          return ((fechaFinSoloFecha >= hoySoloFecha)) ;
        })
    )
      );
}

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
          return ((fechaFinSoloFecha >= hoySoloFecha) && (evento.getUsuario() != gestorId)) ;
        })
    )
      );
}
  

  obtenerEventosMisEventos(): Observable<ClassEvento[]> {
    return this.http.get<ClassEvento[]>(this.URL + "eventos/").pipe(
      map(data => data.map(item => new ClassEvento(item)))
    );
  }


 obtenerEventosDelGestor(gestorId: number): Observable<ClassEvento[]> {
  return this.obtenerEventos().pipe(
      map(eventos => {
      return eventos.filter(ev => {
             return Number(ev.getUsuario()) === gestorId;
      });
    })
  );
}


  
crearEvento(evento: EventoForm): Observable<ClassEvento> {
   return this.http.post<ClassEvento>(this.URL + "eventos/", evento).pipe(
        map(data => new ClassEvento(data))
      );
}

eliminarEventoPorIdEvento(id_evento: string): Observable<void> {
  console.log(id_evento)
  console.log(`${this.URL}eventos/${id_evento}/`)
  return this.obtenerEventos().pipe(
    map(eventos => eventos.find(ev => ev.getId() === id_evento)),
    switchMap(evento => {
      if (!evento) throw new Error(`Evento con id_evento ${id_evento} no encontrado`);
        return this.http.delete<void>(`${this.URL}eventos/${evento.getId()}/`);
    })
  );
}



}
