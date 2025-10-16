import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassMiembro } from '../../model/miembro';
import { map } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class ServiceQuienesSomos {
  private URL: string = "http://localhost:3000/miembros";

  constructor( private http: HttpClient ) { }

  obtenerMiembros(): Observable<ClassMiembro[]> {

    return this.http.get<ClassMiembro[]>( this.URL ).pipe(
      map( data => data.map( ( item: any ) => new ClassMiembro( item ) ) )
    );

  }
}
