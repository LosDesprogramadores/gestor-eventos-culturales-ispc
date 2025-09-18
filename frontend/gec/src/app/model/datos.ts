export class ClassDatos {
     id_datos: number;
    private nombre: string;
    private apellido: string;
    private empresa: string;
    private cuil: string;


	constructor($id_datos: number, $nombre: string, $apellido: string, $empresa: string, $cuil: string) {
		this.id_datos = $id_datos;
		this.nombre = $nombre;
		this.apellido = $apellido;
		this.empresa = $empresa;
		this.cuil = $cuil;
	}
    

    /**
     * Getter $nombre
     * @return {string}
     */
	public get $nombre(): string {
		return this.nombre;
	}

    /**
     * Getter $apellido
     * @return {string}
     */
	public get $apellido(): string {
		return this.apellido;
	}

    /**
     * Getter $empresa
     * @return {string}
     */
	public get $empresa(): string {
		return this.empresa;
	}

    /**
     * Getter $cuil
     * @return {string}
     */
	public get $cuil(): string {
		return this.cuil;
	}

    /**
     * Setter $nombre
     * @param {string} value
     */
	public set $nombre(value: string) {
		this.nombre = value;
	}

    /**
     * Setter $apellido
     * @param {string} value
     */
	public set $apellido(value: string) {
		this.apellido = value;
	}

    /**
     * Setter $empresa
     * @param {string} value
     */
	public set $empresa(value: string) {
		this.empresa = value;
	}

    /**
     * Setter $cuil
     * @param {string} value
     */
	public set $cuil(value: string) {
		this.cuil = value;
	}

}
