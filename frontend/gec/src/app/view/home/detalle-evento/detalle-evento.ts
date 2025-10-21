import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassEvento } from '../../../model/evento';
import { SEvento } from '../../../services/service-evento/s-evento';
import { CommonModule, DatePipe } from '@angular/common';
import { InscripcionService } from '../../../services/services-inscripcion/inscripcion';
import { Auth } from '../../../services/service-autenticacion/auth.service';

@Component({
  
  selector: 'app-detalle-evento',
   imports: [CommonModule],
  templateUrl: './detalle-evento.html',
  styleUrls: ['./detalle-evento.css']
})
export class DetalleEvento implements OnInit {
  private uid?: number | null;

  evento!: ClassEvento;

  constructor( public route: ActivatedRoute,
    public router: Router,
    private serviceEvento: SEvento,
    private serviceInscripcion : InscripcionService,
    private serviceLogin : Auth
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
      const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/home']);
      return;
    }
      this.serviceEvento.obtenerUnEvento(id).subscribe({
      next: (ev) => this.evento = ev,
      error: () => this.router.navigate(['/home'])
    });
  }

  cargarDatosEvento() {
    if (!this.evento) return;
    (document.getElementById('titulo-evento') as HTMLElement).innerText = this.evento.getNombre();
    (document.getElementById('descripcion-evento') as HTMLElement).innerText = this.evento.getDescripcion();
    (document.getElementById('ubicacion-evento') as HTMLElement).innerText = "this.evento.getLugar()";
    (document.getElementById('capacidad-evento') as HTMLElement).innerText =
      `Capacidad: ${this.evento.getCapacidad()} | Inscriptos: ${this.evento.getInscriptos()}`;
    (document.getElementById('fecha-hora-evento') as HTMLElement).innerText =
      new Date(this.evento.getFechaHoraEvento()).toLocaleString();
    (document.getElementById('imagen-evento') as HTMLImageElement).src = this.evento.getImagen();
  }

  inscribirse() {
   this.uid = this.serviceEvento.validacionEvento(this.evento);
   
      if(this.uid != -1 && this.uid != null)
         this.serviceInscripcion.registrarInscripcion(this.evento, this.uid);

}
}
