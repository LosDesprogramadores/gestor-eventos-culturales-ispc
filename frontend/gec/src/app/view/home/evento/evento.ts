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
// Eliminado el import no usado SelectMultipleControlValueAccessor

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe, Banner],
  templateUrl: './evento.html',
  styleUrls: ['./evento.css']
})
export class Evento implements OnInit {

  // Cambiamos a 'number' ya que -1 es el código de fallo
  private uid?: number; 
  
  // PROPIEDAD CLAVE para el Modal: Almacena el evento y controla la visibilidad
  public eventoAConfirmar: ClassEvento | null = null; 

  eventos$: Observable<ClassEvento[]>;
  private categoria$ = new BehaviorSubject<number | null>(null);
  private search$ = new BehaviorSubject<string>('');

  filteredEventos$: Observable<ClassEvento[]>;

  private catMap: Record<number, string> = {
    1: 'Otros',
    2: 'Teatro',
    3: 'Comedia',
    4: 'Drama',
    5: 'Musical',
    6: 'Artes',
    7: 'Literatura',
    8: 'Cine',
    9: 'Taller',
    10: 'Danza',
    11: 'Encuentro',
    12: 'Diálogo',
  };

  categorias$: Observable<{ id: number; name: string }[]>;

  constructor(
    private serviceEvento: SEvento,
    private auth: Auth,
    private router: Router,
    private inscripciones: InscripcionService,
    private alertas: SAlert
  ) {
    this.eventos$ = this.serviceEvento.obtenerEventos();

    this.categorias$ = this.eventos$.pipe(
      map(evs => {
        const ids = Array.from(
          new Set((evs ?? []).map(e => this.getCategoriaId(e)))
        ).filter(n => n !== null) as number[];

        return ids
          .map(id => ({ id, name: this.catMap[id] ?? `Categoría ${id}` }))
          .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
      })
    );

    this.filteredEventos$ = combineLatest([this.eventos$, this.categoria$, this.search$]).pipe(
      map(([evs, cat, q]) => {
        let lista = evs ?? [];

        const hoy = new Date(); 
        hoy.setHours(0, 0, 0, 0);

        // excluir eventos pasados
        lista = lista.filter(e => {
          const d = this.getFecha(e);
          return d != null && d >= hoy;
        });

        // filtro por categoría
        if (cat != null) lista = lista.filter(e => this.getCategoriaId(e) === cat);

        // búsqueda simple por nombre
        const needle = (q ?? '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
        if (needle) {
          lista = lista.filter(e => {
            const nombre = (e.getNombre?.() ?? (e as any).nombre ?? '')
              .toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
            return nombre.includes(needle);
          });
        }

        // orden por fecha ascendente
        return [...lista].sort((a, b) => (this.getFecha(a)?.getTime() ?? 0) - (this.getFecha(b)?.getTime() ?? 0));
      })
    );
  }

  ngOnInit(): void {}


  onCategoriaChange(val: string) { this.categoria$.next(val ? Number(val) : null); }
  onSearchChange(v: string) { this.search$.next(v ?? ''); }

  getCategoriaId(e: ClassEvento): number | null {
    const raw = e.getCategoria?.() ?? (e as any).categoria ?? null;
    const n = Number(raw);
    return isNaN(n) ? null : n;
  }

  categoriaNombre(id?: number | null): string {
    if (!id) return 'Categoría';
    return this.catMap[id] ?? 'Categoría';
  }

  categoriaNombreFromEvento(e: ClassEvento): string {
    return this.categoriaNombre(this.getCategoriaId(e));
  }

  private getFecha(e: ClassEvento): Date | null {
    const raw: any = e.getFechaHoraEvento?.() ?? (e as any).fechaHoraEvento ?? null;
    if (!raw) return null;
    const d: Date = raw instanceof Date ? raw : new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }

   confirmarInscripcion(evento: ClassEvento) {
       const validationResult = this.serviceEvento.validacionEvento(evento);
   
    if (validationResult !== -1 && validationResult !== null) {
        this.eventoAConfirmar = evento;
    }
  }

  async ejecutarInscripcion() {
    const evento = this.eventoAConfirmar;
    this.eventoAConfirmar = null; 
    
    if (!evento) return;

    this.uid = this.serviceEvento.validacionEvento(evento);
   
      if(this.uid != -1 && this.uid != null){
       this.inscripciones.registrarInscripcion(evento, this.uid);
        this.eventos$ = this.serviceEvento.obtenerEventos();
      }
        
  }

  verDetalle(evento: ClassEvento) {
    this.router.navigate(['/home/evento/detalle-evento'], { state: { evento } });
  }
}
