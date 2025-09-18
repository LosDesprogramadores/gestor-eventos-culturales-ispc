import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService, Evento } from '../../../services/evento.service';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { NavHome } from '../../home/nav-home/nav-home';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { ClassEvento } from '../../../model/evento';
import { Inscripcion } from '../../../model/inscripcion';

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
  inscripciones : Inscripcion [] = [];

  constructor(
    private eventoService: EventoService,
    private inscripcionService: InscripcionService,
    private auth: Auth
  ) { }

  ngOnInit(): void {
    //this.cargarRecomendados();
    this.cargarAgendados();
  }


 /*  cargarRecomendados(): void {
    this.eventoService.getEventos().subscribe({
      next: (data) => (this.recomendados = data.slice(0, 4)),
      error: (err) => console.error('Error cargando eventos recomendados', err)
    });
  } */


  cargarAgendados(): void {
    const uid = this.auth.usuarioLogueadoId();
    if (!uid) return;

    this.inscripcionService.getInscripcionesByUsuario(uid).subscribe({
      next: (inscripciones) => {
        this.eventoService.getEventos().subscribe({
          next: (eventos) => {
            const ids = inscripciones.map(i => i.$id_evento);
           // this.agendados = eventos.filter(e => ids.includes(e.id_evento));
          },
          error: (err) => console.error('Error cargando eventos para agendados', err)
        });
      },
      error: (err) => console.error('Error cargando inscripciones', err)
    });
  }


  agregar(evento: ClassEvento): void {
    const uid = this.auth.usuarioLogueadoId();
    if (!uid) return;

    //if (this.agendados.some(e => e.id_evento === evento.$id_evento)) return;

    //const nueva = new Inscripcion(uid,evento.id_evento,new Date().toISOString().split('T')[0],1)


    this.inscripcionService.registrarInscripcion(evento);
   /*  addInscripcion(nueva).subscribe({
      next: () => this.cargarAgendados(),
      error: (err) => console.error('Error agregando inscripcion', err)
    });
  } */

  }


  eliminar(evento: Evento): void {
    const uid = this.auth.usuarioLogueadoId();
    if (!uid) return;

    this.inscripcionService.getInscripcionesByUsuario(uid).subscribe({
      next: (inscripciones) => {
        const insc = inscripciones.find(i => i.$id_evento === evento.id_evento);
        if (!insc?.id) {
          console.warn('No se encontró inscripción para eliminar', insc);
          return;
        }
        this.inscripcionService.deleteInscripcion(insc.id).subscribe({
          next: () => this.cargarAgendados(),
          error: (err) => console.error('Error eliminando inscripcion', err)
        });
      },
      error: (err) => console.error('Error buscando inscripciones antes de eliminar', err)
    });
  }


  imagenEvento(img?: string): string {
    return img && img.trim() ? img : '/assets/images/default.jpg';
  }
}
