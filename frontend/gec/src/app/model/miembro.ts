
export class ClassMiembro {
  private id_miembro: number;
  private nombre: string;
  private img: string;
  private rol: string;
  private cargo: string;
  private email: string;
  private portfolio: string;

  constructor( data: any ) {
    this.id_miembro = data.id_miembro;
    this.nombre = data.nombre;
    this.img = data.img;
    this.rol = data.rol;
    this.cargo = data.cargo;
    this.email = data.email;
    this.portfolio = data.portfolio;
  }
  // 🔹 Getters
  public getIdMiembro(): number {
    return this.id_miembro;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getImg(): string {
    return this.img;
  }

  public getRol(): string {
    return this.rol;
  }

  public getCargo(): string {
    return this.cargo;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPortfolio(): string {
    return this.portfolio;
  }

  // 🔹 Setters
  public setIdMiembro( id_miembro: number ): void {
    this.id_miembro = id_miembro;
  }

  public setNombre( nombre: string ): void {
    this.nombre = nombre;
  }

  public setImg( img: string ): void {
    this.img = img;
  }

  public setRol( rol: string ): void {
    this.rol = rol;
  }

  public setCargo( cargo: string ): void {
    this.cargo = cargo;
  }

  public setEmail( email: string ): void {
    this.email = email;
  }

  public setPortfolio( portfolio: string ): void {
    this.portfolio = portfolio;
  }

}