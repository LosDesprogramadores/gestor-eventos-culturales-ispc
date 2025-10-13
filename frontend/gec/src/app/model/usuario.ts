import { EnumRol } from './rol';

export class classUsuario {
  private id_usuario: number;
  private email: string;
  private contrasenia: string;
  private fechaRegistro: Date;
  private cuentaActiva: boolean;
  private rol: EnumRol;

  constructor(
    id_usuario: number,
    email: string,
    contrasenia: string,
    fechaRegistro: Date,
    cuentaActiva: boolean,
    rol: EnumRol
  ) {
    this.id_usuario = id_usuario;
    this.email = email;
    this.contrasenia = contrasenia;
    this.fechaRegistro = fechaRegistro;
    this.cuentaActiva = cuentaActiva;
    this.rol = rol;
  }

  // ✅ Reconstruye un objeto classUsuario desde JSON plano
  static fromJson(json: any): classUsuario {
    return new classUsuario(
      json.id_usuario ?? json.id ?? 0,
      json.email ?? '',
      json.contrasenia ?? '',
      json.fechaRegistro ? new Date(json.fechaRegistro) : new Date(),
      json.cuentaActiva ?? true,
      json.rol ?? EnumRol.USUARIO
    );
  }

  // Getters
  public getId_usuario(): number { return this.id_usuario; }
  public getEmail(): string { return this.email; }
  public getContrasenia(): string { return this.contrasenia; }
  public getFechaRegistro(): Date { return this.fechaRegistro; }
  public isCuentaActiva(): boolean { return this.cuentaActiva; }
  public getRol(): EnumRol { return this.rol; }

  // Setters
  public setId_usuario(id_usuario: number): void { this.id_usuario = id_usuario; }
  public setEmail(email: string): void { this.email = email; }
  public setContrasenia(contrasenia: string): void { this.contrasenia = contrasenia; }
  public setFechaRegistro(fechaRegistro: Date): void { this.fechaRegistro = fechaRegistro; }
  public setCuentaActiva(cuentaActiva: boolean): void { this.cuentaActiva = cuentaActiva; }
  public setRol(rol: EnumRol): void { this.rol = rol; }
}
