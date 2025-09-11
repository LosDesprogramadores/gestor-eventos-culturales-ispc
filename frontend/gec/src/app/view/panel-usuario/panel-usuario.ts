import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { NavHome } from '../home/nav-home/nav-home';
import { EventoService, Evento } from '../../services/evento.service';

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [CommonModule, Header, Footer, NavHome],
  templateUrl: './panel-usuario.html',
  styleUrl: './panel-usuario.css'
})
export class PanelUsuarioComponent implements OnInit {
  recomendados: Evento[] = [];  // eventos de la DB
  agendados: Evento[] = [];     // eventos del usuario

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (data) => (this.recomendados = data),
      error: (err) => console.error('Error al cargar eventos', err)
    });
  }

  agregar(evento: Evento): void {
    if (!this.agendados.find(ev => ev.id_evento === evento.id_evento)) {
      this.agendados.push(evento);
    }
  }

  eliminar(id: number): void {
    this.agendados = this.agendados.filter(ev => ev.id_evento !== id);
  }
}
