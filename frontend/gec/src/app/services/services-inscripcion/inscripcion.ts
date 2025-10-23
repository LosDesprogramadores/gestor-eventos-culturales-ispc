import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Auth } from '../service-autenticacion/auth.service';
import { ClassEvento } from '../../model/evento';
import { Inscripcion } from '../../model/inscripcion';
import { IInscripcion } from '../../model/iIncripcion';
import { SEvento } from '../service-evento/s-evento';
import { EventoForm } from '../../model/eventoForm';
import { SAlert } from '../service-alert/s-alert';

@Injectable( { providedIn: 'root' } )
export class InscripcionService {
  //private apiUrl = 'http://127.0.0.1:8000/api/';
  private apiUrl = 'https://gestor-eventos-culturales-ispc.onrender.com/api/';

  inscripcion?: Inscripcion;

  inscripcionInterfaz: IInscripcion = {
    usuario: 0,
    evento_id: 0,
    fecha_inscripcion: '',
    fecha_inicio_inscripcion: '',
    fecha_fin_inscripcion: '',
    estado: 0
  };

  inscripcionForm: EventoForm = {
    id: 0,
    inscriptos: 0
  };

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private mensajesAlert: SAlert,
    private serviceEvento: SEvento
  ) { }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>( `${ this.apiUrl }inscripciones/` );
  }

  getInscripcionesByUsuario( id_usuario: number ): Observable<Inscripcion[]> {
    return this.http.get<any>( `${ this.apiUrl }inscripciones/usuario/${ id_usuario }/` ).pipe(
      map( response => {
        const data = Array.isArray( response?.results )
          ? response.results
          : Array.isArray( response )
            ? response
            : response
              ? [ response ]
              : [];

        return data.map( ( insc: any ) => {
          const eventoInstancia = new ClassEvento( insc.evento ?? {} );
          return new Inscripcion( {
            id: insc.id,
            idUsuario: insc.idUsuario ?? 0,
            evento: eventoInstancia,
            fechaInscripcion: insc.fechaInscripcion ?? '',
            idEstado: insc.idEstado ?? 0
          } );
        } );
      } ),
      catchError( error => {
        console.error( 'Error al obtener inscripciones:', error );
        this.mensajesAlert.mensajeErrorInscripcion();
        return of( [] );
      } )
    );
  }

  private addInscripcion( insc: Inscripcion ): Observable<Inscripcion> {
    this.inscripcionInterfaz = {
      usuario: insc.getIdUsuario(),
      evento_id: Number( insc.getEvento().getId() ?? 0 ),
      fecha_inscripcion: new Date().toISOString().slice( 0, 10 ),
      fecha_inicio_inscripcion: insc.getEvento().getFechaInicioInscripcion(),
      fecha_fin_inscripcion: insc.getEvento().getFechaFinInscripcion(),
      estado: insc.getIdEstado()
    };

    console.log( 'Datos enviados al backend:', this.inscripcionInterfaz );
    return this.http.post<Inscripcion>( `${ this.apiUrl }inscripciones/`, this.inscripcionInterfaz );
  }

  deleteInscripcion( id: number ): Observable<void> {
    console.log( "!numero: " + id );
    return this.http.delete<void>( `${ this.apiUrl }inscripciones/${ id }/` );
  }

  registrarInscripcion( evento: ClassEvento, uid: number ): void {
    this.getInscripcionesByUsuario( uid ).pipe(
      switchMap( inscripciones => {

        const yaInscripto = inscripciones.find(
          ins => Number( ins.getEvento()?.getId() ) === Number( evento.getId() )
        );

        if ( yaInscripto ) {
          this.mensajesAlert.mensajeExistenciaDeInscripcion();
          return of( null );
        }

        const nuevaInscripcion = new Inscripcion( {
          id: undefined,
          usuario: this.auth.session.user?.id ?? 0,
          evento,
          fecha_inscripcion: new Date().toISOString().split( 'T' )[ 0 ],
          estado: 1
        } );

        return this.addInscripcion( nuevaInscripcion ).pipe(
          switchMap( inscCreada => {
            console.log( 'Inscripción creada:', inscCreada );
            this.mensajesAlert.mensajeInscripcion();

            const idEvento = evento.getId();
            if ( idEvento === undefined ) {
              throw new Error( 'El evento no tiene ID definido' );
            }

            const eventoActualizar: { id: number; inscriptos: number; } = {
              id: Number( idEvento ),
              inscriptos: evento.getInscriptos() + 1
            };

            return this.serviceEvento.actualizarEvento( eventoActualizar );
          } )
        );
      } ),
      catchError( err => {
        console.error( 'Error al registrar inscripción:', err );
        return of( null );
      } )
    ).subscribe( {
      next: updated => {
        if ( updated ) console.log( 'Evento actualizado en BD:', updated );
      }
    } );
  }
}
