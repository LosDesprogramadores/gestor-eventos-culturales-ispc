import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClassDatos } from '../../model/datos';
import { classUsuario } from '../../model/usuario';

@Injectable( {
  providedIn: 'root'
} )
export class ServiceDatos {
  private apiUrl = 'http://127.0.0.1:8000/api/datos/';

  constructor( private http: HttpClient ) { }

  //Crea un dato que se asocia a un usuario
  crearDato( datos: ClassDatos ): Observable<ClassDatos> {

    // Convertir ClassDatos a objeto plano para enviar al backend
    const payload = {
      nombre: datos.getNombre(),
      apellido: datos.getApellido(),
      empresa: datos.getEmpresa(),
      cuil: datos.getCuil(),
      id_usuario: datos.getUsuario().getId()
    };

    return this.http.post<any>( this.apiUrl, payload ).pipe(
      tap( response => console.log( 'Respuesta del servidor:', response ) ),
      map( data => {
        // Construir el objeto usuario desde la respuesta
        console.log( datos.getUsuario().getId() );
        const usuario = data.id_usuario
          ? ( typeof data.id_usuario === 'object'
            ? classUsuario.fromJson( data.id_usuario )
            : classUsuario.fromJson( { id_usuario: data.id_usuario } ) )
          : classUsuario.fromJson( { id_usuario: datos.getUsuario().getId() } );

        // Crear y retornar instancia de ClassDatos
        return new ClassDatos(
          data.id_datos ?? data.id ?? 0,
          data.nombre,
          data.apellido,
          data.empresa,
          data.cuil,
          usuario
        );
      } )
    );
  }

  //Obtiene datos
  obtenerDatos(): Observable<ClassDatos[]> {
    return this.http.get<any[]>( this.apiUrl ).pipe(
      tap( data => console.log( 'Datos obtenidos:', data ) ),
      map( datos => datos.map( d => {
        const usuario = d.id_usuario
          ? ( typeof d.id_usuario === 'object'
            ? classUsuario.fromJson( d.id_usuario )
            : classUsuario.fromJson( { id_usuario: d.id_usuario } ) )
          : classUsuario.fromJson( { id_usuario: 0 } );

        return new ClassDatos(
          d.id_datos ?? d.id ?? 0,
          d.nombre,
          d.apellido,
          d.empresa,
          d.cuil,
          usuario
        );
      } ) )
    );
  }

  // Actualiza un dato existente
  actualizarDato( id: number, datos: ClassDatos ): Observable<ClassDatos> {

    // Convertir ClassDatos a objeto plano
    const payload = {
      nombre: datos.getNombre(),
      apellido: datos.getApellido(),
      empresa: datos.getEmpresa(),
      cuil: datos.getCuil(),
      id_usuario: datos.getUsuario().getId()
    };

    return this.http.patch<any>( `${ this.apiUrl }${ id }/`, payload ).pipe(
      tap( response => console.log( '✅ Dato actualizado:', response ) ),
      map( data => {
        const usuario = data.id_usuario
          ? ( typeof data.id_usuario === 'object'
            ? classUsuario.fromJson( data.id_usuario )
            : classUsuario.fromJson( { id_usuario: data.id_usuario } ) )
          : classUsuario.fromJson( { id_usuario: 0 } );

        return new ClassDatos(
          data.id_datos ?? data.id ?? 0,
          data.nombre,
          data.apellido,
          data.empresa,
          data.cuil,
          usuario
        );
      } )
    );
  }
}