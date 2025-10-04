export enum EnumRol {
  USUARIO = 'USUARIO',
  GESTOR = 'GESTOR',
  ADMINISTRADOR = 'ADMINISTRADOR'
}

export const ROLES: { [key: number]: EnumRol } = {
  1: EnumRol.USUARIO,
  2: EnumRol.GESTOR,
  3: EnumRol.ADMINISTRADOR
};


export class ClassRol {
    private id_rol: number;
    private nombre: EnumRol;
    private descripcion: string;

    constructor(id_rol: number, nombre: EnumRol, descripcion: string) {
        this.id_rol = id_rol;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    // Getters
    public getId_rol(): number {
        return this.id_rol;
    }

    public getNombre(): EnumRol {
        return this.nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    // Setters
    public setId_rol(id_rol: number): void {
        this.id_rol = id_rol;
    }

    public setNombre(nombre: EnumRol): void {
        this.nombre = nombre;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

}
