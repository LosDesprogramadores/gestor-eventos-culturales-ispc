import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ClassEvento } from '../../model/evento';

@Injectable({
  providedIn: 'root'
})
export class SEvento {
  private URL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  
  obtenerEventos(): Observable<ClassEvento[]> {
    return this.http.get<ClassEvento[]>(this.URL + "eventos").pipe(
      map(data => data.map(item => new ClassEvento(item)))
    );
  }
  

  obtenerEventosMisEventos(): Observable<ClassEvento[]> {
    return this.http.get<ClassEvento[]>(this.URL + "eventos").pipe(
      map(data => data.map(item => new ClassEvento(item)))
    );
  }


 obtenerEventosDelGestor(gestorId: number): Observable<ClassEvento[]> {
  return this.obtenerEventos().pipe(
      map(eventos => {
      return eventos.filter(ev => {
             return Number(ev.gestor) === gestorId;
      });
    })
  );
}


  
crearEvento(evento: ClassEvento): Observable<ClassEvento> {

  return this.http.post<ClassEvento>(this.URL + "eventos", evento).pipe(
        map(data => new ClassEvento(data))
      );
}

eliminarEventoPorIdEvento(id_evento: string): Observable<void> {
  return this.obtenerEventos().pipe(
    map(eventos => eventos.find(ev => ev.id_evento === id_evento)),
    switchMap(evento => {
      if (!evento) throw new Error(`Evento con id_evento ${id_evento} no encontrado`);
        return this.http.delete<void>(`${this.URL}eventos/${evento.id}`);
    })
  );
}



}
