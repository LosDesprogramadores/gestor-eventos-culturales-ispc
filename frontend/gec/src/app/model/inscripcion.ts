import { ClassEvento } from "./evento";

export class Inscripcion {

     id?: string;
     private idUsuario: number;
     private evento: ClassEvento;
     private fechaInscripcion: string;
     private idEstado: number;
    

      constructor(data : any) {  
          this.id = data.id;
          this.idUsuario = data.idUsuario || data.usuario; 
          this.evento = data.evento; 
          this.fechaInscripcion = data.fechaInscripcion || data.fecha_inscripcion;
          this.idEstado = data.idEstado || data.estado;
     }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setIdUsuario(value: number) {
        this.idUsuario = value;
    }
    
    public getEvento(): ClassEvento {
        return this.evento;
    }

    public setEvento(value: ClassEvento) {
        this.evento = value;
    }
    
    public getFechaInscripcion(): string {
        return this.fechaInscripcion;
    }

    public setFechaInscripcion(value: string) {
        this.fechaInscripcion = value;
    }
    
    public getIdEstado(): number {
        return this.idEstado;
    }

    public setIdEstado(value: number) {
        this.idEstado = value;
    }

}