import { ClassDatos } from "./datos";
import { ClassRol } from "./rol";

export class classUsuario {
    id_usuario: number;
   private email: string;
   private contrasenia: string;
   private fechaRegistro: Date;
   private cuentaActiva: boolean;
   private datosPersonales: ClassDatos;
   private rol: ClassRol;

	constructor($id_usuario: number, $email: string, $contrasenia: string, $fechaRegistro: Date, $cuentaActiva: boolean, $datosPersonales: ClassDatos, $rol: ClassRol) {
		this.id_usuario = $id_usuario;
		this.email = $email;
		this.contrasenia = $contrasenia;
		this.fechaRegistro = $fechaRegistro;
		this.cuentaActiva = $cuentaActiva;
		this.datosPersonales = $datosPersonales;
		this.rol = $rol;
	}


    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string {
		return this.email;
	}

    /**
     * Getter $contrasenia
     * @return {string}
     */
	public get $contrasenia(): string {
		return this.contrasenia;
	}

    /**
     * Getter $fechaRegistro
     * @return {Date}
     */
	public get $fechaRegistro(): Date {
		return this.fechaRegistro;
	}

    /**
     * Getter $cuentaActiva
     * @return {boolean}
     */
	public get $cuentaActiva(): boolean {
		return this.cuentaActiva;
	}

    /**
     * Getter $datosPersonales
     * @return {ClassDatos}
     */
	public get $datosPersonales(): ClassDatos {
		return this.datosPersonales;
	}

    /**
     * Getter $rol
     * @return {ClassRol}
     */
	public get $rol(): ClassRol {
		return this.rol;
	}

    /**
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
	}

    /**
     * Setter $contrasenia
     * @param {string} value
     */
	public set $contrasenia(value: string) {
		this.contrasenia = value;
	}

    /**
     * Setter $fechaRegistro
     * @param {Date} value
     */
	public set $fechaRegistro(value: Date) {
		this.fechaRegistro = value;
	}

    /**
     * Setter $cuentaActiva
     * @param {boolean} value
     */
	public set $cuentaActiva(value: boolean) {
		this.cuentaActiva = value;
	}

    /**
     * Setter $datosPersonales
     * @param {ClassDatos} value
     */
	public set $datosPersonales(value: ClassDatos) {
		this.datosPersonales = value;
	}

    /**
     * Setter $rol
     * @param {ClassRol} value
     */
	public set $rol(value: ClassRol) {
		this.rol = value;
	}

	

	

}