import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { NavHome } from '../../home/nav-home/nav-home';
import { ClassEvento } from '../../../model/evento';
import { EventoService } from '../../../services/evento.service';
import { SEvento } from '../../../services/service-evento/s-evento';


@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [CommonModule, Header, Footer, NavHome],
  templateUrl: './panel-usuario.html',
  styleUrl: './panel-usuario.css'
})
export class PanelUsuarioComponent implements OnInit {
  recomendados: ClassEvento[] = [];  // eventos de la DB
  agendados: ClassEvento[] = [];     // eventos del usuario

  constructor( private eventoService: SEvento ) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  agregarEvento(): void {}
  cargarEventos(): void {
   /*  this.eventoService.obtenerEventos.subscribe({
      next: (data) => (this.recomendados = data),
      error: (err) => console.error('Error al cargar eventos', err)
    });  */
  }

  agregar(evento: ClassEvento): void {
    if (!this.agendados.find(ev => ev.$id_evento === evento.$id_evento)) {
      this.agendados.push(evento);
    }
  }

  eliminar(id: number): void {
    this.agendados = this.agendados.filter(ev => ev.$id_evento !== id);
  }
}
