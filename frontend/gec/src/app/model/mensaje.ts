export class Mensaje{

    private message:string;
    private time: number;
    private tipoAlerta : string;
    private showMessage : boolean;

     constructor(message?: string, time?: number, tipoAlerta?: string, showMessage? :boolean) {
     this.message = message ?? '';           
     this.time = time ?? 0;               
    this.tipoAlerta = tipoAlerta ?? '';   
    this.showMessage = showMessage ?? false ;
     }
    

    /**
     * Getter $message
     * @return {string}
     */
	public get $message(): string {
		return this.message;
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
     * Getter $showMessage
     * @return {boolean}
     */
	public get $showMessage(): boolean {
		return this.showMessage;
	}

    /**
     * Setter $message
     * @param {string} value
     */
	public set $message(value: string) {
		this.message = value;
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

    /**
     * Setter $showMessage
     * @param {boolean} value
     */
	public set $showMessage(value: boolean) {
		this.showMessage = value;
	}
  



} 