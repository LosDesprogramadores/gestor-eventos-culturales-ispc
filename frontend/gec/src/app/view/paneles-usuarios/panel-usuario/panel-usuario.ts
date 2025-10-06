import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { NavHome } from '../../home/nav-home/nav-home';
import { Auth, UiRole } from '../../../services/service-autenticacion/auth.service';
import { ClassEvento } from '../../../model/evento';
import { Inscripcion } from '../../../model/inscripcion';
import { Observable } from 'rxjs';
import { SAlert } from '../../../services/service-alert/s-alert';
import { Mensaje } from '../../../model/mensaje';

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [CommonModule, Header, Footer, NavHome],
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

  // 👉 expongo el rol en una propiedad pública para el template
  role: UiRole = 'ANON'; 

  constructor(
    private inscripcionService: InscripcionService,
    private auth: Auth,
    private mensajeAlert: SAlert 
  ) { }

  ngOnInit(): void {
    // guardo el rol actual
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
  }

  private eliminar(inscrip: Inscripcion): void {
    this.cerrarModalEliminar()
    const uid = this.auth.usuarioLogueadoId();
    if (!uid) return;

    this.inscripcionService.getInscripcionesByUsuario(uid).subscribe({
      next: (inscripciones) => {
        const insc = inscripciones.find(i => i.id === inscrip.id);
        if (!insc?.id) return;

        this.inscripcionService.deleteInscripcion(insc.id).subscribe({
          next: () => {
            this.mensajeAlert.mensajeEliminacionInscripcion();
            this.cargarMisInscriciones();
          }
        });
      }
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
