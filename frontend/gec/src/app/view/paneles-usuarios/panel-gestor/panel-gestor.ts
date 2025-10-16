import { Component, OnInit } from '@angular/core';
import { Footer } from "../../../shared/footer/footer";
import { NavHome } from '../../home/nav-home/nav-home';
import { Header } from '../../../shared/header/header';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { SEvento } from '../../../services/service-evento/s-evento';
import { ClassEvento } from '../../../model/evento';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SAlert } from '../../../services/service-alert/s-alert';

@Component({ 
    selector: 'app-panel-gestor',
    standalone: true,
    imports: [Footer,NavHome, Header, CommonModule, FormsModule], 
    templateUrl: './panel-gestor.html', 
    styleUrls: ['./panel-gestor.css'] 
})
export class PanelGestor implements OnInit {

  eventos$!: Observable<ClassEvento[]>;
  mostrarFormulario = false;
  eventoAEliminar: ClassEvento | null = null; 
  mostrarModalEliminar: boolean = false; 
  hoverX = 0;
  hoverY = 0;
  hoverVisible = false;
  hoverImg = '';

  nuevoEvento: ClassEvento = new ClassEvento({
    _id_evento: 0,
    _nombre: '',
    _fechaHoraEvento: '',
    _capacidad: 0,
    _imagen: '',
    _fechaInicioInscripcion: '',
    _fechaFinInscripcion: '',
    _ubicacion: '',
    _estado: 1,
    _gestor: 0,
    _categoria: 0
  });

  creando = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' = 'success';
  mostrarMensaje: boolean = false;

  constructor(private sesion: Auth, private eventosService: SEvento, private alerta : SAlert) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  onMouseMove(event: MouseEvent, imgUrl: string) {
    this.hoverX = event.clientX;
    this.hoverY = event.clientY;
    this.hoverImg = imgUrl;
    this.hoverVisible = true;
  }

  onMouseLeave() {
    this.hoverVisible = false;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async crearEvento(): Promise<void> {
    if (!this.nuevoEvento.nombre || !this.nuevoEvento.fechaHoraEvento || !this.nuevoEvento.capacidad ||
        !this.nuevoEvento.imagen || !this.nuevoEvento.fechaInicioInscripcion || !this.nuevoEvento.fechaFinInscripcion ||
        !this.nuevoEvento.ubicacion) {
      this.tipoMensaje = 'danger';
      this.mensaje = 'Error: Por favor completa todos los campos del formulario.';
      this.mostrarMensaje = true;
      setTimeout(() => this.mostrarMensaje = false, 2000);
      return;
    }

    this.nuevoEvento.gestor = this.sesion.session.user?.id ?? 0;

    try {
      const creado = await firstValueFrom(this.eventosService.crearEvento(this.nuevoEvento));
      this.tipoMensaje = 'success';
      this.mensaje = `Evento "${creado.nombre}" creado exitosamente!`;
      this.mostrarMensaje = true;

      this.nuevoEvento = new ClassEvento({
        _id_evento: 0,
        _nombre: '',
        _fechaHoraEvento: '',
        _capacidad: 0,
        _imagen: '',
        _fechaInicioInscripcion: '',
        _fechaFinInscripcion: '',
        _ubicacion: '',
        _estado: 1,
        _gestor: 0,
        _categoria: 0
      });

      this.mostrarFormulario = false;
      setTimeout(() => this.mostrarMensaje = false, 2000);
      this.cargarEventos();

    } catch (err) {
      console.error("Error al crear evento:", err);
      this.tipoMensaje = 'danger';
      this.mensaje = 'Error al crear el evento.';
      this.mostrarMensaje = true;
      setTimeout(() => this.mostrarMensaje = false, 2000);
    }
  }

  private cargarEventos() {
    this.eventos$ = this.eventosService.obtenerEventosDelGestor(this.sesion.session.user?.id ?? 0);
  }

  abrirModalEliminar(evento: ClassEvento) {
    this.eventoAEliminar = evento;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.eventoAEliminar = null;
    this.mostrarModalEliminar = false;
  }

  eliminarEventoConfirmado() {
    if (!this.eventoAEliminar) return;

    this.eventosService.eliminarEventoPorIdEvento(this.eventoAEliminar.id_evento!).subscribe({
      next: () => {
        this.tipoMensaje = 'success';
        this.mensaje = `Evento "${this.eventoAEliminar?.nombre}" eliminado correctamente`;
        this.mostrarMensaje = true;

        this.cargarEventos();
        this.cerrarModalEliminar();

        setTimeout(() => this.mostrarMensaje = false, 2000);
      },
      error: (err) => {
        console.error('Error al eliminar evento:', err);
        this.tipoMensaje = 'danger';
        this.mensaje = 'No se pudo eliminar el evento. Intenta nuevamente.';
        this.mostrarMensaje = true;
        this.cerrarModalEliminar();

        setTimeout(() => this.mostrarMensaje = false, 2000);
      }
    });
  }

  editarEvento(_t18: ClassEvento) {
    throw new Error('Method not implemented.');
  }

}
