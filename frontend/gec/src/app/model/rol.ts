export class ClassRol {
     id_rol: number;
    private nombre: string;
    private descripcion: string;



	constructor($id_rol: number, $nombre: string, $descripcion: string) {
		this.id_rol = $id_rol;
		this.nombre = $nombre;
		this.descripcion = $descripcion;
	}
	

    /**
     * Getter $nombre
     * @return {string}
     */
	public get $nombre(): string {
		return this.nombre;
	}

    /**
     * Getter $descripcion
     * @return {string}
     */
	public get $descripcion(): string {
		return this.descripcion;
	}

    /**
     * Setter $nombre
     * @param {string} value
     */
	public set $nombre(value: string) {
		this.nombre = value;
	}

    /**
     * Setter $descripcion
     * @param {string} value
     */
	public set $descripcion(value: string) {
		this.descripcion = value;
	}


}
