export class ClassDatos {
    private id_datos: number;
    private nombre: string;
    private apellido: string;
    private empresa: string;
    private cuil: string;

    constructor(
        id_datos: number,
        nombre: string,
        apellido: string,
        empresa: string,
        cuil: string
    ) {
        this.id_datos = id_datos;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        this.cuil = cuil;
    }

    // Getters
    public getId_datos(): number {
        return this.id_datos;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public getEmpresa(): string {
        return this.empresa;
    }

    public getCuil(): string {
        return this.cuil;
    }

    // Setters
    public setId_datos(id_datos: number): void {
        this.id_datos = id_datos;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public setEmpresa(empresa: string): void {
        this.empresa = empresa;
    }

    public setCuil(cuil: string): void {
        this.cuil = cuil;
    }
}
