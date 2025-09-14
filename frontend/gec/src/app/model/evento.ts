export class ClassEvento {
  private id_evento : number;
  private nombre : string;
  private ubicacion : string;
  private fechaHoraEvento: Date;
  private capacidad : number;
  private imagen : string;
  private fechaInicioInscripcion : Date;
  private fechaFinInscripcion: Date;
  private estado?: any;
  private gestor: number;
  private categoria?: any;
  
  constructor(data: any) {
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
    

    /**
     * Getter $id_evento
     * @return {number}
     */
	public get $id_evento(): number {
		return this.id_evento;
	}

     /**
     * Getter $gestor
     * @return {number}
     */
	public get $gestor(): number {
		return this.gestor;
	}

    /**
     * Getter $nombre
     * @return {string}
     */
	public get $nombre(): string {
		return this.nombre;
	}

    /**
     * Getter $ubicacion
     * @return {string}
     */
	public get $ubicacion(): string {
		return this.ubicacion;
	}

    /**
     * Getter $fechaHoraEvento
     * @return {Date}
     */
	public get $fechaHoraEvento(): Date {
		return this.fechaHoraEvento;
	}

    /**
     * Getter $capacidad
     * @return {number}
     */
	public get $capacidad(): number {
		return this.capacidad;
	}

    /**
     * Getter $imagen
     * @return {string}
     */
	public get $imagen(): string {
		return this.imagen;
	}

    /**
     * Getter $fechaInicioInscripcion
     * @return {Date}
     */
	public get $fechaInicioInscripcion(): Date {
		return this.fechaInicioInscripcion;
	}

    /**
     * Getter $fechaFinInscripcion
     * @return {Date}
     */
	public get $fechaFinInscripcion(): Date {
		return this.fechaFinInscripcion;
	}

    /**
     * Setter $id_evento
     * @param {number} value
     */
	public set $id_evento(value: number) {
		this.id_evento = value;
	}

    /**
     * Setter $nombre
     * @param {string} value
     */
	public set $nombre(value: string) {
		this.nombre = value;
	}

    /**
     * Setter $ubicacion
     * @param {string} value
     */
	public set $ubicacion(value: string) {
		this.ubicacion = value;
	}

    /**
     * Setter $fechaHoraEvento
     * @param {Date} value
     */
	public set $fechaHoraEvento(value: Date) {
		this.fechaHoraEvento = value;
	}

    /**
     * Setter $capacidad
     * @param {number} value
     */
	public set $capacidad(value: number) {
		this.capacidad = value;
	}

    /**
     * Setter $imagen
     * @param {string} value
     */
	public set $imagen(value: string) {
		this.imagen = value;
	}

    /**
     * Setter $fechaInicioInscripcion
     * @param {Date} value
     */
	public set $fechaInicioInscripcion(value: Date) {
		this.fechaInicioInscripcion = value;
	}

    /**
     * Setter $fechaFinInscripcion
     * @param {Date} value
     */
	public set $fechaFinInscripcion(value: Date) {
		this.fechaFinInscripcion = value;
	}
       
     



}