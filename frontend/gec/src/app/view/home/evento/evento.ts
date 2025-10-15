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

  // Base
  eventos$: Observable<ClassEvento[]>;

  // Filtros
  private categoria$ = new BehaviorSubject<number | null>(null);
  private search$    = new BehaviorSubject<string>('');   // 🔎 nuevo: texto

  // Resultado
  filteredEventos$: Observable<ClassEvento[]>;

  constructor(
    private serviceEvento: SEvento,
    private auth: Auth,
    private router: Router,
    private inscripciones: InscripcionService,
    private alertas: SAlert
  ) {
    this.eventos$ = this.serviceEvento.obtenerEventos();

    this.filteredEventos$ = combineLatest([
      this.eventos$,
      this.categoria$,
      this.search$
    ]).pipe(
      map(([evs, categoria, q]) => {
        let lista = evs ?? [];

        // "Hoy" al inicio del día (no mostrar pasados)
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        //quitar eventos pasados
        lista = lista.filter(e => {
          const d = this.getFecha(e);
          return d != null && d >= hoy;
        });

        // filtro por categoría 
        if (categoria != null) {
          lista = lista.filter(e => {
            const raw = (e as any).getCategoria?.() ?? (e as any).categoria;
            const n = Number(raw);
            return !Number.isNaN(n) && n === categoria;
          });
        }

        // filtro por texto (título, lugar, descripción)
        const needle = this.norm(q);
        if (needle) {
          lista = lista.filter(e => {
            const titulo = this.norm((e as any).getNombre?.() ?? (e as any).nombre ?? '');
            const lugar  = this.norm((e as any).ubicacion ?? '');
            const desc   = this.norm((e as any).getDescripcion?.() ?? (e as any).descripcion ?? '');
            return (
              titulo.includes(needle) ||
              lugar.includes(needle)  ||
              desc.includes(needle)
            );
          });
        }

        // ordenar SIEMPRE por fecha ascendente
        lista = [...lista].sort((a, b) => {
          const ad = this.getFecha(a)?.getTime() ?? 0;
          const bd = this.getFecha(b)?.getTime() ?? 0;
          if (ad === 0 && bd === 0) return 0;
          if (ad === 0) return 1;
          if (bd === 0) return -1;
          return ad - bd;
        });

        return lista;
      })
    );
  }

  ngOnInit(): void {
   
  }

  onCategoriaChange(val: string) {
    if (val == null || val === '') {
      this.categoria$.next(null);
      return;
    }
    const n = Number(val);
    this.categoria$.next([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(n) ? n : null);
  }

  onSearchChange(v: string) {
    this.search$.next(v ?? '');
  }

  onClearFilters() {
    this.categoria$.next(null);
    this.search$.next('');
  }

  private getFecha(e: ClassEvento): Date | null {
    let raw: any;
    try { raw = (e as any).getFechaHoraEvento?.(); }
    catch { raw = (e as any).fechaHoraEvento ?? null; }
    if (!raw) return null;
    if (raw instanceof Date) return raw;
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }

  private norm(s: string): string {
    return (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
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
