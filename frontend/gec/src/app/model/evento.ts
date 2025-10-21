export class ClassEvento {
  
  private id: string | undefined;
  private nombre: string;
  private ubicacion: string; 
  private fechaHoraEvento: string;
  private capacidad: number;
  private imagen: string;
  private inscriptos : number;
  private descripcion : string;
  private fechaInicioInscripcion: string;
  private fechaFinInscripcion: string;
  private estado?: any;
  private usuario: number;
  private categoria?: any;

  constructor(data: any) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.ubicacion = data.ubicacion; 
    this.fechaHoraEvento = data.fecha_hora_evento;
    this.capacidad = data.capacidad;
    this.imagen = data.imagen;
    this.inscriptos = data.inscriptos;
    this.descripcion = data.descripcion;
    this.fechaInicioInscripcion = data.fecha_inicio_inscripcion;
    this.fechaFinInscripcion = data.fecha_fin_inscripcion;
    this.estado = data.estado;
    this.usuario = data.usuario;
    this.categoria = data.categoria;
  }

 
  getId(): string | undefined{
    return this.id ;
  }

  getNombre(): string {
    return this.nombre;
  }

  getUbicacion(): string {
    return this.ubicacion;
  }

  getFechaHoraEvento(): string {
    return this.fechaHoraEvento;
  }

  getCapacidad(): number {
    return this.capacidad;
  }

  getImagen(): string {
    return this.imagen;
  }

  getFechaInicioInscripcion(): string {
    return this.fechaInicioInscripcion;
  }

  getFechaFinInscripcion(): string {
    return this.fechaFinInscripcion;
  }

  getEstado(): number {
    return this.estado;
  }

  getUsuario(): number {
    return this.usuario;
  }

  getCategoria(): number {
    return this.categoria;
  }

  getInscriptos(): number {
    return this.inscriptos;
  }

   getDescripcion(): string {
    return this.descripcion;
  }

  setId(id: string): void {
    this.id = id;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

   setUbicacion(ubicacion: string): void {
    this.ubicacion = ubicacion;
  } 

  setFechaHoraEvento(fechaHoraEvento: string): void {
    this.fechaHoraEvento = fechaHoraEvento;
  }

  setCapacidad(capacidad: number): void {
    this.capacidad = capacidad;
  }

  setImagen(imagen: string): void {
    this.imagen = imagen;
  }

   setInscriptos(inscriptos: number): void {
    this.inscriptos = inscriptos;
  }

  setFechaInicioInscripcion(fechaInicioInscripcion: string): void {
    this.fechaInicioInscripcion = fechaInicioInscripcion;
  }

  setFechaFinInscripcion(fechaFinInscripcion: string): void {
    this.fechaFinInscripcion = fechaFinInscripcion;
  }

  setEstado(estado: any): void {
    this.estado = estado;
  }

  setUsuario(gestor: number): void {
    this.usuario= gestor;
  }

  setCategoria(categoria: any): void {
    this.categoria = categoria;
  }

   setDescripcion(descripcion: any): void {
    this.descripcion = descripcion;
  }
}

  
 
