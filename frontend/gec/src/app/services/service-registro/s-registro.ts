import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SRegistro {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Registra en "datos"
  registrarDatos(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/datos`, datos);
  }

  // Registra en "usuarios"
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }
}
