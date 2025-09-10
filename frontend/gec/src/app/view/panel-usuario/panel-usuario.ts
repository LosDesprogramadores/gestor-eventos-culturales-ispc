import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { NavHome } from '../home/nav-home/nav-home';
import { EventoService, Evento } from '../../services/evento.service';

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer, NavHome],
  templateUrl: './panel-usuario.html',
  styleUrl: './panel-usuario.css'
})
export class PanelUsuarioComponent implements OnInit {
  eventos: Evento[] = [];
  nuevoTitulo: string = '';
  nuevaDescripcion: string = '';
  nuevaFecha: string = '';

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (data) => (this.eventos = data),
      error: (err) => console.error('Error al cargar eventos', err)
    });
  }

  agregarEvento(): void {
    if (this.nuevoTitulo && this.nuevaDescripcion && this.nuevaFecha) {
      const nuevo: Evento = {
        id_evento: this.eventos.length + 1,
        titulo: this.nuevoTitulo,
        descripcion: this.nuevaDescripcion,
        hora_evento: "00:00",   
        fecha_desde: this.nuevaFecha,
        fecha_hasta: this.nuevaFecha,
        capacidad: 100,
        lugar: "Sin definir",
        imagen: "default.jpg",
        id_categoria_evento: 1,
        id_estado: 1,
        id_gestor: 1
      };

      this.eventoService.addEvento(nuevo).subscribe({
        next: () => {
          this.cargarEventos();
          this.nuevoTitulo = '';
          this.nuevaDescripcion = '';
          this.nuevaFecha = '';
        },
        error: (err) => console.error('Error al agregar evento', err)
      });
    }
  }

  eliminarEvento(id: number): void {
    this.eventoService.deleteEvento(id).subscribe({
      next: () => this.cargarEventos(),
      error: (err) => console.error('Error al eliminar evento', err)
    });
  }
}
