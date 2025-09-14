import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
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


  obtenerEventosDelGestor(gestorId: number): Observable<ClassEvento[]> {
    return this.obtenerEventos().pipe(
      map(eventos => eventos.filter(ev => ev.$gestor === gestorId))
    );
  }


  obtenerUltimoId(): Observable<number> {
    return this.obtenerEventos().pipe(
      map(eventos => {
        if (!eventos || eventos.length === 0) return 0;
        const ids = eventos.map(ev => Number(ev.$id_evento)).filter(id => !isNaN(id));
        return ids.length ? Math.max(...ids) : 0;
      })
    );
  }

crearEvento(evento: ClassEvento): Observable<ClassEvento> {

  return this.obtenerUltimoId().pipe(
    switchMap(ultimoId => {
      const nuevoIdEvento = evento.$id_evento && evento.$id_evento > ultimoId
        ? evento.$id_evento
        : ultimoId + 1;

      const payload = {
        id_evento: nuevoIdEvento,
        nombre: evento.$nombre ?? '',
        fechaHoraEvento: evento.$fechaHoraEvento ?? '',
        capacidad: evento.$capacidad ?? 0,
        imagen: evento.$imagen ?? '',
        fechaInicioInscripcion: evento.$fechaInicioInscripcion ?? '',
        fechaFinInscripcion: evento.$fechaFinInscripcion ?? '',
        ubicacion: evento.$ubicacion ?? '',
        estado: evento.$estado ?? 1,
        gestor: evento.$gestor ?? 0,
        categoria: evento.$categoria ?? 0
      };

      console.log("Creando evento con ID_evento:", payload.id_evento);

      return this.http.post<ClassEvento>(this.URL + "eventos", payload).pipe(
        map(data => new ClassEvento(data))
      );
    })
  );
}

eliminarEventoPorIdEvento(id_evento: number): Observable<void> {
  return this.obtenerEventos().pipe(
    map(eventos => eventos.find(ev => ev.$id_evento === id_evento)),
    switchMap(evento => {
      if (!evento) throw new Error(`Evento con id_evento ${id_evento} no encontrado`);
        return this.http.delete<void>(`${this.URL}eventos/${evento.id}`);
    })
  );
}



}
