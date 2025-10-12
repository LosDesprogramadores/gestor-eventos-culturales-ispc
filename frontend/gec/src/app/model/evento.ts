export class ClassEvento {
  id?: string;
  private _id_evento: string;
  private _nombre: string;
  private _ubicacion: string;
  private _fechaHoraEvento: Date;
  private _capacidad: number;
  private _imagen: string;
  private _fechaInicioInscripcion: Date;
  private _fechaFinInscripcion: Date;
  private _estado?: any;
  private _gestor: number;
  private _categoria?: any;

  constructor(data: any) {
    this.id = data.id;
    this._id_evento = data._id_evento;
    this._nombre = data._nombre;
    this._ubicacion = data._ubicacion;
    this._fechaHoraEvento = data._fechaHoraEvento;
    this._capacidad = data._capacidad;
    this._imagen = data._imagen;
    this._fechaInicioInscripcion = data._fechaInicioInscripcion;
    this._fechaFinInscripcion = data._fechaFinInscripcion;
    this._estado = data._estado;
    this._gestor = data._gestor;
    this._categoria = data._categoria;
  }

  // Getters y Setters
  public get id_evento(): string { return this._id_evento; }
  public set id_evento(value: string) { this._id_evento = value; }

  public get nombre(): string { return this._nombre; }
  public set nombre(value: string) { this._nombre = value; }

  public get ubicacion(): string { return this._ubicacion; }
  public set ubicacion(value: string) { this._ubicacion = value; }

  public get fechaHoraEvento(): Date { return this._fechaHoraEvento; }
  public set fechaHoraEvento(value: Date) { this._fechaHoraEvento = value; }

  public get capacidad(): number { return this._capacidad; }
  public set capacidad(value: number) { this._capacidad = value; }

  public get imagen(): string { return this._imagen; }
  public set imagen(value: string) { this._imagen = value; }

  public get fechaInicioInscripcion(): Date { return this._fechaInicioInscripcion; }
  public set fechaInicioInscripcion(value: Date) { this._fechaInicioInscripcion = value; }

  public get fechaFinInscripcion(): Date { return this._fechaFinInscripcion; }
  public set fechaFinInscripcion(value: Date) { this._fechaFinInscripcion = value; }

  public get estado(): any { return this._estado; }
  public set estado(value: any) { this._estado = value; }

  public get gestor(): number { return this._gestor; }
  public set gestor(value: number) { this._gestor = value; }

  public get categoria(): any { return this._categoria; }
  public set categoria(value: any) { this._categoria = value; }
}