import { EnumRol } from './rol';

export class classUsuario {
  // Propiedades que coinciden con la API de Django
  public id: number; 
  public email: string;
  public password: string;
  public fecha_registro: Date;
  public cuenta_activa: boolean;
  public id_rol: EnumRol;
  public is_active: boolean;
  public is_staff: boolean;

  constructor(
    id: number,
    email: string,
    password: string,
    fecha_registro: Date,
    cuenta_activa: boolean,
    id_rol: EnumRol,
    is_active: boolean = true,
    is_staff: boolean = false,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.fecha_registro = fecha_registro;
    this.cuenta_activa = cuenta_activa;
    this.id_rol = id_rol;
    this.is_active = is_active;
    this.is_staff = is_staff;
  }

  // Método para construir el objeto desde la respuesta JSON de Django
  static fromJson(json: any): classUsuario {
    return new classUsuario(
      json.id ?? 0,
      json.email ?? '',
      '', // La contraseña NUNCA se devuelve en un GET
      json.fecha_registro ? new Date(json.fecha_registro) : new Date(),
      json.cuenta_activa ?? true,
      json.id_rol ?? EnumRol.USUARIO,
      json.is_active ?? true,
      json.is_staff ?? false,
    );
  }

  // Getters y Setters 
  public getId(): number { return this.id; }
  public getEmail(): string { return this.email; }
  public getPassword(): string { return this.password; }
  public getFechaRegistro(): Date { return this.fecha_registro; }
  public isCuentaActiva(): boolean { return this.cuenta_activa; }
  public getIdRol(): EnumRol { return this.id_rol; }

  public setId(id: number): void { this.id = id; }
  public setEmail(email: string): void { this.email = email; }
  public setPassword(password: string): void { this.password = password; }
  public setFechaRegistro(fechaRegistro: Date): void { this.fecha_registro = fechaRegistro; }
  public setCuentaActiva(cuentaActiva: boolean): void { this.cuenta_activa = cuentaActiva; }
  public setIdRol(id_rol: EnumRol): void { this.id_rol = id_rol; }
}