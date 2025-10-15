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
import { EventoForm } from '../../../model/eventoForm';
import { Ubicacion } from '../../../model/ubicacion';
import { TipoEvento } from '../../../model/categoria';


@Component({ 
    selector: 'app-panel-gestor',
    standalone: true,
    imports: [Footer,NavHome, Header, CommonModule, FormsModule], 
    templateUrl: './panel-gestor.html', 
    styleUrls: ['./panel-gestor.css'] 
})



export class PanelGestor implements OnInit {

    tiposDeEvento = TipoEvento;
    tiposDeEventoKeys: Array<keyof typeof TipoEvento> = 
        Object.keys(TipoEvento).filter(k => isNaN(Number(k))) as Array<keyof typeof TipoEvento>;
     tipoEvento: any = {
        nombre: '',
         tipo_evento: '', 
    };
    
  eventos$!: Observable<ClassEvento[]>;
  mostrarFormulario = false;
  eventoAEliminar: ClassEvento | null = null; 
  mostrarModalEliminar: boolean = false; 
  hoverX = 0;
  hoverY = 0;
  hoverVisible = false;
  hoverImg = '';
   
   ubicacion : Ubicacion = {
    direccion : '',
    latitud : 0,
    longitud : 0
   }


   nuevoEvento: EventoForm = {
    nombre: '',
    /* ubicacion: '', */
    categoria: 1,
    fecha_hora_evento:'',
    capacidad: 0,
    inscriptos : 0,
    descripcion : 'HOÑA',
    imagen: '',
    fecha_inicio_inscripcion: '',
    fecha_fin_inscripcion:'',
    estado: 1,
    usuario: 0,
  };

  creando = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' = 'success';
  mostrarMensaje: boolean = false;

  constructor(private sesion: Auth, private eventosService: SEvento, private alerta : SAlert) {}

  ngOnInit(): void {
    this.cargarEventos();
    console.log("Adentro")
    console.log(this.eventos$)
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
    if (!this.nuevoEvento.nombre || !this.nuevoEvento.fecha_hora_evento|| !this.nuevoEvento.capacidad ||
        !this.nuevoEvento.imagen|| !this.nuevoEvento.fecha_fin_inscripcion|| !this.nuevoEvento.fecha_inicio_inscripcion/* ||
        !this.nuevoEvento.ubicacion */) {
      this.tipoMensaje = 'danger';
      this.mensaje = 'Error: Por favor completa todos los campos del formulario.';
      this.mostrarMensaje = true;
      setTimeout(() => this.mostrarMensaje = false, 2000);
      return;
    }
    
    this.nuevoEvento.usuario = this.sesion.session.user?.id ?? 0 ;

    try {
      console.log("Valores del nuevo evento" + this.nuevoEvento.fecha_fin_inscripcion)
      var  nuevoClassEvent = new ClassEvento(this.nuevoEvento);
      console.log ("nuevo evento: " );  
      console.log (nuevoClassEvent);  
      const creado = await firstValueFrom(this.eventosService.crearEvento(this.nuevoEvento));
      this.tipoMensaje = 'success';
      this.mensaje = `Evento "${creado.getNombre()}" creado exitosamente!`;
      this.mostrarMensaje = true;



      this.nuevoEvento ={
      nombre: '',
    /* ubicacion: '', */
    categoria: 1,
    fecha_hora_evento:'',
    capacidad: 0,
    inscriptos : 0,
    descripcion : 'HOÑA',
    imagen: '',
    fecha_inicio_inscripcion: '',
    fecha_fin_inscripcion:'',
    estado: 1,
    usuario: 0,
      };

      this.mostrarFormulario = false;
      setTimeout(() => this.mostrarMensaje = false, 2000);
      this.cargarEventos();
      this.mostrarConsola();

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
    console.log(evento.getId())
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.eventoAEliminar = null;
    this.mostrarModalEliminar = false;
  }

  eliminarEventoConfirmado() {
    if (!this.eventoAEliminar) return;

    this.eventosService.eliminarEventoPorIdEvento(this.eventoAEliminar.getId()!).subscribe({
      next: () => {
        this.tipoMensaje = 'success';
        this.mensaje = `Evento "${this.eventoAEliminar?.getNombre()}" eliminado correctamente`;
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

  mostrarConsola(){
    console.log("Mostrando eventos")
    this.eventos$.subscribe({
      next: (eventos) => {
        console.log('Eventos recibidos:');
        eventos.forEach(evento => console.log(evento)); 
      },
      error: (err) => console.error('Error al obtener eventos:', err),
      complete: () => console.log('Suscripción completada')
    });
  }



}
