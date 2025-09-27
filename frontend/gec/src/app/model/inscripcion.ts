import { ClassEvento } from "./evento";

export class Inscripcion {

     id?: string;
     private _id_usuario: number;
     private _evento: ClassEvento;
     private _fecha_inscripcion: string;
     private _id_estado: number;
    

     constructor(data : any
       
     ) {  this.id = data.id;
          this._id_usuario = data._id_usuario;
          this._evento = data._evento;
          this._fecha_inscripcion = data._fecha_inscripcion;
          this._id_estado = data._id_estado;
        
     }

    // Getters
     public get id_usuario(): number {
          return this._id_usuario;
     }

     public get evento(): ClassEvento {
          return this._evento;
     }

     public get fecha_inscripcion(): string {
          return this._fecha_inscripcion;
     }

     public get id_estado(): number {
          return this._id_estado;
     }

    // Setters
     public set id_usuario(value: number) {
          this._id_usuario = value;
     }

     public set evento(value: ClassEvento) {
          this._evento = value;
     }

     public set fecha_inscripcion(value: string) {
          this._fecha_inscripcion = value;
     }


     public set id_estado(value: number) {
          this._id_estado = value;
     }
}