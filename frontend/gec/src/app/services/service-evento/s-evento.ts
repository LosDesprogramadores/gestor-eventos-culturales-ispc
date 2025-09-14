import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassEvento } from '../../model/evento';


@Injectable({
  providedIn: 'root'
})
export class SEvento {
  private URL:string ="http://localhost:3000/" 
  constructor(private http:HttpClient){ }

  obtenerEventos(): Observable<ClassEvento[]> {
    return this.http.get<ClassEvento[]>(this.URL+"eventos").pipe(
      map(data => data.map((item: any) => new ClassEvento(item)))
    );
  }
 obtenerEventosDelGestor(): Observable<ClassEvento[]> {
    return this.http.get<ClassEvento[]>(this.URL+"eventos").pipe(
      map(data => data.map((item: any) => new ClassEvento(item)))
    );
  }


}
