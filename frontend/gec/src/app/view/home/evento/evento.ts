import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Banner } from '../banner/banner';
import { SEvento } from '../../../services/service-evento/s-evento';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClassEvento } from '../../../model/evento';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { SAlert } from '../../../services/service-alert/s-alert';
import { Mensaje } from '../../../model/mensaje';

@Component({
  selector: 'app-evento',
  imports: [RouterModule, Banner, CommonModule],
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})
export class Evento implements OnInit {

  uid?: number | null;
  mensaje: Mensaje = new Mensaje();

  eventos$: Observable<ClassEvento[]>;

  private categoria$ = new BehaviorSubject<number | null>(null);

  filteredEventos$: Observable<ClassEvento[]>;

  constructor(
    private serviceEvento: SEvento,
    private auth: Auth,
    private router: Router,
    private inscripciones: InscripcionService,
    private alertas: SAlert
  ) {
    this.eventos$ = this.serviceEvento.obtenerEventos();

    // Derivamos la lista aplicando el filtro de categoría
    this.filteredEventos$ = combineLatest([this.eventos$, this.categoria$]).pipe(
      map(([evs, categoria]) => {
        const lista = evs ?? [];
        if (categoria == null) return lista; // sin filtro → todos

        return lista.filter(e => {
          // Tomamos la categoría desde el getter o la prop según exista
          const raw = (e as any).getCategoria?.() ?? (e as any).categoria;
          const n = Number(raw);
          return !Number.isNaN(n) && n === categoria;
        });
      })
    );
  }

  ngOnInit(): void {
    console.log('que onda');
    this.mostrarConsola();
  }

  onCategoriaChange(val: string) {
    // "" o null => todas
    if (val == null || val === '') {
      this.categoria$.next(null);
      return;
    }
    const n = Number(val);

    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(n)) {
      this.categoria$.next(n);
    } else {
      this.categoria$.next(null);
    }
  }

  agregar(evento: ClassEvento): void {
    if (this.auth.role === 'ANON') {
      this.alertas.mensajeUsuario(this.auth.usuarioLogueadoId() ?? 0);
    }
    this.uid = this.auth.usuarioLogueadoId();
    if (!this.uid) return;
    console.log(this.uid + ' logueado: ' + evento.getUsuario());
    if (this.uid == evento.getUsuario()) {
      this.alertas.mensajeErrorEventoPropio();
    } else {
      this.inscripciones.registrarInscripcion(evento, this.uid);
    }
  }

  mostrarConsola() {
    console.log('Mostrando eventos');
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
