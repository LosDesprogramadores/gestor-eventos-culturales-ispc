export class ClassEvento {
    id?: string;   
  private id_evento: number;
  private nombre: string;
  private ubicacion: string;
  private fechaHoraEvento: Date;
  private capacidad: number;
  private imagen: string;
  private fechaInicioInscripcion: Date;
  private fechaFinInscripcion: Date;
  private estado?: any;
  private gestor: number;
  private categoria?: any;
  constructor(data: any) {
        this.id = data.id;  
    this.id_evento = data.id_evento;
    this.nombre = data.nombre;
    this.ubicacion = data.ubicacion;
    this.fechaHoraEvento = data.fechaHoraEvento;
    this.capacidad = data.capacidad;
    this.imagen = data.imagen;
    this.fechaInicioInscripcion = data.fechaInicioInscripcion;
    this.fechaFinInscripcion = data.fechaFinInscripcion;
    this.estado = data.estado;
    this.gestor = data.gestor;
    this.categoria = data.categoria;
  }
    

  public get $id_evento(): number { return this.id_evento; }
  public get $nombre(): string { return this.nombre; }
  public get $ubicacion(): string { return this.ubicacion; }
  public get $fechaHoraEvento(): Date { return this.fechaHoraEvento; }
  public get $capacidad(): number { return this.capacidad; }
  public get $imagen(): string { return this.imagen; }
  public get $fechaInicioInscripcion(): Date { return this.fechaInicioInscripcion; }
  public get $fechaFinInscripcion(): Date { return this.fechaFinInscripcion; }
  public get $estado(): any { return this.estado; }
  public get $gestor(): number { return this.gestor; }
  public get $categoria(): any { return this.categoria; }


  public set $id_evento(value: number) { this.id_evento = value; }
  public set $nombre(value: string) { this.nombre = value; }
  public set $ubicacion(value: string) { this.ubicacion = value; }
  public set $fechaHoraEvento(value: Date) { this.fechaHoraEvento = value; }
  public set $capacidad(value: number) { this.capacidad = value; }
  public set $imagen(value: string) { this.imagen = value; }
  public set $fechaInicioInscripcion(value: Date) { this.fechaInicioInscripcion = value; }
  public set $fechaFinInscripcion(value: Date) { this.fechaFinInscripcion = value; }
  public set $estado(value: any) { this.estado = value; }
  public set $gestor(value: number) { this.gestor = value; }
  public set $categoria(value: any) { this.categoria = value; }
}
