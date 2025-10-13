import { ClassDatos } from "./datos";


export class classUsuario {
    private id_usuario: number;
    private email: string;
    private contrasenia: string;
    private fechaRegistro: Date;
    private cuentaActiva: boolean;
    private rol: number;

    constructor(
        id_usuario: number,
        email: string,
        contrasenia: string,
        fechaRegistro: Date,
        cuentaActiva: boolean,
        id_rol: number
    ) {
        this.id_usuario = id_usuario;
        this.email = email;
        this.contrasenia = contrasenia;
        this.fechaRegistro = fechaRegistro;
        this.cuentaActiva = cuentaActiva;
        this.rol = id_rol;
    }

    // Getters
    public getId_usuario(): number {
        return this.id_usuario;
    }

    public getEmail(): string {
        return this.email;
    }

    public getContrasenia(): string {
        return this.contrasenia;
    }

    public getFechaRegistro(): Date {
        return this.fechaRegistro;
    }

    public isCuentaActiva(): boolean {
        return this.cuentaActiva;
    }

    public getRol(): number {
        return this.rol;
    }

    // Setters
    public setId_usuario(id_usuario: number): void {
        this.id_usuario = id_usuario;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setContrasenia(contrasenia: string): void {
        this.contrasenia = contrasenia;
    }

    public setFechaRegistro(fechaRegistro: Date): void {
        this.fechaRegistro = fechaRegistro;
    }

    public setCuentaActiva(cuentaActiva: boolean): void {
        this.cuentaActiva = cuentaActiva;
    }

    public setRol(rol: number): void {
        this.rol = rol;
    }
}



