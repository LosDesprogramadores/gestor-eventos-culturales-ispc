export interface EventoForm {
   id?: number;
  nombre?: string;
  /* ubicacion?: string; */
  fecha_hora_evento?: string;
  capacidad?: number;
  imagen?: string;
  inscriptos?: number;
  descripcion?: string;
  fecha_inicio_inscripcion?: string;
  fecha_fin_inscripcion?: string;
  estado?: number;
  usuario?: number;
  categoria?: number;
}