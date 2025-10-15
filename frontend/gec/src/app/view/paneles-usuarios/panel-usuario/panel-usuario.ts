import { Component, numberAttribute, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { NavHome } from '../../home/nav-home/nav-home';
import { Auth, UiRole } from '../../../services/service-autenticacion/auth.service';
import { ClassEvento } from '../../../model/evento';
import { Inscripcion } from '../../../model/inscripcion';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { SAlert } from '../../../services/service-alert/s-alert';
import { Mensaje } from '../../../model/mensaje';
import { RouterLink } from '@angular/router';
import { SEvento } from '../../../services/service-evento/s-evento';
import { EventoForm } from '../../../model/eventoForm';

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [RouterLink, CommonModule, Header, Footer, NavHome],
  templateUrl: './panel-usuario.html',
  styleUrl: './panel-usuario.css'
})
export class PanelUsuarioComponent implements OnInit {

  recomendados: ClassEvento[] = [];
  agendados: ClassEvento[] = [];
  inscripciones$!: Observable<Inscripcion[]>;
  eventos$!: Observable<ClassEvento[]>;
  hoverVisible = true;
  mensaje = new Mensaje();
  mostrarModalEliminar = false;
  inscripcionEliminar: Inscripcion | null = null; 
  eventoActualizar!: ClassEvento;;

   inscripcionForm: EventoForm = {
      id: 0,
      inscriptos: 0
    };
    
  role: UiRole = 'ANON'; 

  constructor(
    private inscripcionService: InscripcionService,
    private auth: Auth,
    private mensajeAlert: SAlert ,
    private serviceEvento : SEvento
  ) { }

  ngOnInit(): void {
     this.role = this.auth.role;

    this.mensajeAlert.alert$.subscribe((res: Mensaje) => {
      this.mensaje.$showMessage = res.$showMessage;
      this.mensaje.$message = res.$message;
      this.mensaje.$tipoAlerta = res.$tipoAlerta;
      const tiempo = res.$time ?? 2000;
      setTimeout(() => { 
        this.mensaje.$showMessage = false;
      }, tiempo)
    });

    this.cargarMisInscriciones();
  }

  cerrarModalEliminar() {
    this.inscripcionEliminar = null;
    this.mostrarModalEliminar = false;
  }

  cargarMisInscriciones(): void {
    const uid = this.auth.usuarioLogueadoId();
    if (!uid) return;

    this.inscripciones$ = this.inscripcionService.getInscripcionesByUsuario(uid);
  }

  agregar(evento: ClassEvento): void {
    const uid = this.auth.usuarioLogueadoId();
    if (!uid) return;
    this.inscripcionService.registrarInscripcion(evento, uid);
  }

  eliminarInscripcionConfirmada() {
    if (!this.inscripcionEliminar) return;
    this.eliminar(this.inscripcionEliminar)
    this.mostrarModalEliminar = false
  }

  private eliminar(inscrip: Inscripcion): void {
  const uid = this.auth.usuarioLogueadoId();
  if (!uid) return;

  this.inscripcionService.getInscripcionesByUsuario(uid).pipe(
    map(inscripciones => inscripciones.find(i => i.id === inscrip.id)),
    switchMap(insc => {
      if (!insc) return of(null);

      return this.inscripcionService.deleteInscripcion(Number(insc.id)).pipe(
        switchMap(() =>
          this.serviceEvento.obtenerUnEvento(Number(inscrip.getEvento().getId()))
        ),
        switchMap(evento => {
         
          const inscriptosActualizados = evento.getInscriptos() - 1;

          const eventoActualizar = {
            id: Number(evento.getId()),
            inscriptos: inscriptosActualizados
          };

          console.log("Datos a enviar a BD:", eventoActualizar);
          return this.serviceEvento.actualizarEvento(eventoActualizar);
        })
      );
    }),
    catchError(err => {
      console.error('Error en eliminar inscripción:', err);
      return of(null);
    })
  ).subscribe(updatedEvento => {
    if (updatedEvento) console.log('✅ Evento actualizado en BD:', updatedEvento);
    this.mensajeAlert.mensajeEliminacionInscripcion();
    this.cargarMisInscriciones();
  });
}

  imagenEvento(img?: string): string {
    return img && img.trim() ? img : '/assets/images/sin.jpg';
  }

  trackByIndex(index: number, item: Inscripcion): any {
    return item.id ?? index;
  }

  abrirModalEliminar(inscripcion: Inscripcion) {
    this.inscripcionEliminar = inscripcion;
    this.mostrarModalEliminar = true;
  }

}
