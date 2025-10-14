import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Auth } from '../service-autenticacion/auth.service';
import { ClassEvento } from '../../model/evento';
import { Inscripcion } from '../../model/inscripcion';
import { Mensaje } from '../../model/mensaje';
import { SAlert } from '../service-alert/s-alert';




@Injectable({
  providedIn: 'root'
})

export class InscripcionService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  inscripcion: Inscripcion | undefined;
  misInscripciones$ !  : Observable<Inscripcion[]>;
  
  constructor(private http: HttpClient, private auth: Auth, private mensajesAlert : SAlert) {}

  
  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  
 getInscripcionesByUsuario(id_usuario: number): Observable<Inscripcion[]> {
  return this.http.get<any[]>(`${this.apiUrl}?_id_usuario=${id_usuario}/`).pipe(
    map(inscripciones =>
      inscripciones.map(insc => {
       const dataEvento = insc._evento ?? {};
      const eventoInstancia = new ClassEvento(dataEvento);

        const inscData = {
          id: insc.id, 
          _id_usuario: insc.id_usuario ?? insc.id_usuario ?? 0,
          _evento: eventoInstancia,
          _fecha_inscripcion: insc.fecha_inscripcion ?? insc.fecha_inscripcion ?? '',
          _id_estado: insc.id_estado ?? insc.id_estado ?? 0
          
        };

        return new Inscripcion(inscData);
      })
    ),
    catchError(error => {
      console.error('Error al obtener inscripciones:', error);
      this.mensajesAlert.mensajeErrorInscripcion();
      return of([]);
    })
  );
}



  
  private addInscripcion(insc: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, insc);
  }

  
  deleteInscripcion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 /*  agregar(evento: ClassEvento): void {
      const uid = this.auth.usuarioLogueadoId();
      if (!uid) return;

      const nueva= new Inscripcion (uid,evento.$id_evento,new Date().toISOString().split('T')[0],1)
       console.log(nueva)
      this.addInscripcion(nueva).subscribe();
  } */
  
  

 registrarInscripcion(evento: ClassEvento, uid: number): void {
  this.getInscripcionesByUsuario(uid).subscribe(inscripciones => {
     this.inscripcion = inscripciones.find(ins => {
    console.log('Comparando:', ins.getEvento()?.getId(), 'con', evento.getId());
    return ins.getEvento()?.getId() === evento.getId();
  });
    if (this.inscripcion) {
      console.log('Inscripción existente:', this.inscripcion.getEvento().getId());
      this.mensajesAlert.mensajeExistenciaDeInscripcion();
      return;
    }

    const inscripcionData = {
      id: undefined,
      _id_usuario: this.auth.session.user?.id ?? 0,
      _evento: evento,
      _fecha_inscripcion: new Date().toISOString().split('T')[0],
      _id_estado: 1
    };

    const nuevaInscripcion = new Inscripcion(inscripcionData);

    this.addInscripcion(nuevaInscripcion).subscribe({
      next: inscCreada => {
        console.log("Inscripción creada con id:", inscCreada.id);
        this.mensajesAlert.mensajeInscripcion();
      },
      error: err => console.error(err)
    });
  });
}

  

}


