import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassMiembro } from '../../model/miembro';
import { map, delay } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class ServiceQuienesSomos {
  //private URL: string = "http://localhost:3000/miembros";

  // Datos hardcodeados
  private miembrosData = [
    {
      "id_miembro": 1,
      "nombre": "Tomás Monton",
      "img": "assets/images/miembros/tomas.jpeg",
      "rol": "Developer",
      "cargo": "Gestión y Desarrollo",
      "email": "tomasmonton261@gmail.com",
      "portfolio": "https://github.com/LosDesprogramadores/gestor-eventos-culturales-ispc/tree/dev/portfolios/tomasMonton",
      "id": "75eb"
    },
    {
      "id_miembro": 2,
      "nombre": "Julio César Martín",
      "img": "assets/images/miembros/julio.jpeg",
      "rol": "Scrum Master",
      "cargo": "Gestión",
      "email": "JulioMartin447@gmail.com",
      "portfolio": "https://github.com/LosDesprogramadores/gestor-eventos-culturales-ispc/tree/dev/portfolios/martinJulio",
      "id": "e736"
    },
    {
      "id_miembro": 3,
      "nombre": "Alan Darel Marini",
      "img": "assets/images/miembros/alan.jpeg",
      "rol": "Developer",
      "cargo": "Testing",
      "email": "aland.marini@gmail.com",
      "portfolio": "https://github.com/LosDesprogramadores/gestor-eventos-culturales-ispc/tree/dev/portfolios/AlanMarini",
      "id": "53b1"
    },
    {
      "id_miembro": 4,
      "nombre": "Juan Ignacio Moreno",
      "img": "assets/images/miembros/juan.jpeg",
      "rol": "Developer",
      "cargo": "Análisis y Desarrollo",
      "email": "juanimignacio@gmail.com",
      "portfolio": "https://github.com/LosDesprogramadores/gestor-eventos-culturales-ispc/tree/dev/portfolios/juanIgnacioMoreno",
      "id": "b1a3"
    },
    {
      "id_miembro": 5,
      "nombre": "Marcelo Portillo",
      "img": "assets/images/miembros/marcelo.jpeg",
      "rol": "Developer",
      "cargo": "Desarrollo",
      "email": "mportillo79@gmail.com",
      "portfolio": "https://github.com/LosDesprogramadores/gestor-eventos-culturales-ispc/tree/dev/portfolios/marceloportillo",
      "id": "675f"
    },
    {
      "id_miembro": 6,
      "nombre": "Romina Vanesa Huk",
      "img": "assets/images/miembros/romina.jpeg",
      "rol": "Developer",
      "cargo": "Desarrollo",
      "email": "rominahuk@gmail.com",
      "portfolio": "https://github.com/LosDesprogramadores/gestor-eventos-culturales-ispc/tree/dev/portfolios/RominaHuk",
      "id": "8926"
    }
  ];

  constructor( private http: HttpClient ) { }

  obtenerMiembros(): Observable<ClassMiembro[]> {
    return of( this.miembrosData ).pipe(
      delay( 300 ), // Simulamos que viene de un api xD
      map( data => data.map( item => new ClassMiembro( item ) ) )
    );
  }
}