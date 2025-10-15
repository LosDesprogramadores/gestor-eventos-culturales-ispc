import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SEvento } from '../../../services/service-evento/s-evento';
import { ClassEvento } from '../../../model/evento';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { SAlert } from '../../../services/service-alert/s-alert';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Banner } from '../banner/banner';

@Component({
  selector: 'app-evento',
  standalone: true, 
  imports: [CommonModule, RouterModule, AsyncPipe, Banner,],
  templateUrl:'./evento.html',
  styleUrls: ['./evento.css']
})
export class Evento implements OnInit {

  uid?: number | null;

  eventos$: Observable<ClassEvento[]>;
  private categoria$ = new BehaviorSubject<number | null>(null);
  private search$ = new BehaviorSubject<string>('');
  filteredEventos$: Observable<ClassEvento[]>;

  constructor(
    private serviceEvento: SEvento,
    private auth: Auth,
    private router: Router,
    private inscripciones: InscripcionService,
    private alertas: SAlert
  ) {
    this.eventos$ = this.serviceEvento.obtenerEventos();
    this.filteredEventos$ = combineLatest([this.eventos$, this.categoria$, this.search$]).pipe(
      map(([evs, cat, q]) => {
        let lista = evs ?? [];
        const hoy = new Date(); hoy.setHours(0,0,0,0);
       lista = lista.filter(e => {
  const d = this.getFecha(e);
  return d != null && d >= hoy;
});
        if (cat != null) lista = lista.filter(e => Number(e.getCategoria?.() ?? e.getCategoria()) === cat);
        const needle = q?.toLowerCase() ?? '';
        if (needle) lista = lista.filter(e => (e.getNombre?.()?.toLowerCase() ?? '').includes(needle));
        return lista.sort((a,b)=> (this.getFecha(a)?.getTime()??0)-(this.getFecha(b)?.getTime()??0));
      })
    );
  }

  ngOnInit(): void {}

  onCategoriaChange(val: string) { this.categoria$.next(val ? Number(val) : null); }
  onSearchChange(v: string) { this.search$.next(v ?? ''); }

  agregar(evento: ClassEvento) {
    if (this.auth.role === 'ANON') {
      this.alertas.mensajeUsuario(this.auth.usuarioLogueadoId() ?? 0);
      return;
    }
    this.uid = this.auth.usuarioLogueadoId();
    if (!this.uid) return;
    if (this.uid === evento.getUsuario()) {
      this.alertas.mensajeErrorEventoPropio();
      return;
    }
    this.inscripciones.registrarInscripcion(evento, this.uid);
  }

  verDetalle(evento: ClassEvento) {
    this.router.navigate(['/home/evento/detalle-evento'], { state: { evento } });
  }

  private getFecha(e: ClassEvento): Date | null {
    const d = e.getFechaHoraEvento();
    return d ? new Date(d) : null;
  }
}
