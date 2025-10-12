import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { classUsuario } from '../../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class SRegistro {

  private apiUrl = 'http://localhost:3000/usuarios'; // URL de json-server

  constructor(private http: HttpClient) {}

  // Crear nuevo usuario
  registrarUsuario(usuario: classUsuario): Observable<classUsuario> {
    return this.http.post<classUsuario>(this.apiUrl, usuario);
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<classUsuario[]> {
    return this.http.get<classUsuario[]>(this.apiUrl);
  }

  // Buscar por email (validación de duplicados)
  getUsuarioPorEmail(email: string): Observable<classUsuario[]> {
    return this.http.get<classUsuario[]>(`${this.apiUrl}?email=${email}`);
  }
}
