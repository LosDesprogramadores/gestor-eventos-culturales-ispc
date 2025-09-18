export class Inscripcion {

     id?: number;             
  private id_usuario: number;
  private id_evento: number;
  private fecha_inscripcion: string;
  private id_estado: number;


	constructor($id_usuario: number, $id_evento: number, $fecha_inscripcion: string, $id_estado: number) {
		this.id_usuario = $id_usuario;
		this.id_evento = $id_evento;
		this.fecha_inscripcion = $fecha_inscripcion;
		this.id_estado = $id_estado;
	}
  

    /**
     * Getter $id_usuario
     * @return {number}
     */
	public get $id_usuario(): number {
		return this.id_usuario;
	}

    /**
     * Getter $id_evento
     * @return {number}
     */
	public get $id_evento(): number {
		return this.id_evento;
	}

    /**
     * Getter $fecha_inscripcion
     * @return {string}
     */
	public get $fecha_inscripcion(): string {
		return this.fecha_inscripcion;
	}

    /**
     * Getter $id_estado
     * @return {number}
     */
	public get $id_estado(): number {
		return this.id_estado;
	}

    /**
     * Setter $id_usuario
     * @param {number} value
     */
	public set $id_usuario(value: number) {
		this.id_usuario = value;
	}

    /**
     * Setter $id_evento
     * @param {number} value
     */
	public set $id_evento(value: number) {
		this.id_evento = value;
	}

    /**
     * Setter $fecha_inscripcion
     * @param {string} value
     */
	public set $fecha_inscripcion(value: string) {
		this.fecha_inscripcion = value;
	}

    /**
     * Setter $id_estado
     * @param {number} value
     */
	public set $id_estado(value: number) {
		this.id_estado = value;
	}


}