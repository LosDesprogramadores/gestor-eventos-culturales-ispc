import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { classUsuario } from '../../model/usuario';

@Injectable( {
  providedIn: 'root'
} )
export class SRegistro {

  //private apiUrl = 'http://localhost:8000/api/usuarios/'; 
  private apiUrl = 'https://gestor-eventos-culturales-ispc.onrender.com/api/usuarios/';

  constructor( private http: HttpClient ) { }

  // Crear nuevo usuario
  registrarUsuario( usuario: any ): Observable<any> {
    return this.http.post<any>( this.apiUrl, usuario );
  }
  // Obtener todos los usuarios
  getUsuarios(): Observable<classUsuario[]> {
    return this.http.get<classUsuario[]>( this.apiUrl );
  }

}
