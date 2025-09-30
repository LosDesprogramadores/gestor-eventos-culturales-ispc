export class Mensaje{

    private mesagge:string;
    private time: number;
    private tipoAlerta : string;


	constructor($mesagge: string, $time: number , $tipoAlerta : string) {
		this.mesagge = $mesagge;
		this.time = $time;
        this.tipoAlerta = $tipoAlerta;
        
	}
    


    /**
     * Getter $mesagge
     * @return {string}
     */
	public get $mesagge(): string {
		return this.mesagge;
	}

    /**
     * Getter $time
     * @return {number}
     */
	public get $time(): number {
		return this.time;
	}

    /**
     * Getter $tipoAlerta
     * @return {string}
     */
	public get $tipoAlerta(): string {
		return this.tipoAlerta;
	}

    /**
     * Setter $mesagge
     * @param {string} value
     */
	public set $mesagge(value: string) {
		this.mesagge = value;
	}

    /**
     * Setter $time
     * @param {number} value
     */
	public set $time(value: number) {
		this.time = value;
	}

    /**
     * Setter $tipoAlerta
     * @param {string} value
     */
	public set $tipoAlerta(value: string) {
		this.tipoAlerta = value;
	}
   



} 