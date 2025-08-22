import { Injectable } from '@angular/core';

export interface IEvento{
  id: number;
  imagenUrl: string;
  titulo: string;
  capacidad: string;
  lugar: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor() { }

  public getEventos(): IEvento[] {
    return [
      { id:0,
        imagenUrl: "https://images.unsplash.com/photo-1496767000195-3841ae3f97f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Carnavales",
        capacidad: "2000 lugares",
        lugar: "Teatro Real - San Jerónimo 664",
        fecha: "Mayo - Jueves 22 | 20:30 Hs"
      },
      {
        id:1,
        imagenUrl: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Comedias",
        capacidad: "1000 lugares",
        lugar: "Teatro Comedia - San Juan 664",
        fecha: "Mayo - Jueves 29 | 22:30 Hs"
      },
      {id:2,
        imagenUrl: "https://images.unsplash.com/photo-1715139718837-f9efc78cddc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Jazz en Vivo",
        capacidad: "350 personas",
        lugar: "Sala del Buen Pastor",
        fecha: "Junio - Viernes 7 | 21:00 Hs"
      },
      {id:3,
        imagenUrl: "https://images.unsplash.com/photo-1576724196706-3f23f51ea351?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Obra de Teatro",
        capacidad: "500 butacas",
        lugar: "Centro Cultural Córdoba",
        fecha: "Julio - Sábado 13 | 19:00 Hs"
      },
      {id:4,
        imagenUrl: "https://images.pexels.com/photos/16935932/pexels-photo-16935932/free-photo-of-restaurante-fiesta-partido-ramas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        titulo: "Taller de Fotografía",
        capacidad: "25 cupos",
        lugar: "Casa de la Cultura",
        fecha: "Junio - Miércoles 12 | 18:00 Hs"
      },
      {id:5,
        imagenUrl: "https://images.unsplash.com/photo-1631888722728-1578b7ba6dee?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Feria del Libro",
        capacidad: "Libre",
        lugar: "Plaza San Martín",
        fecha: "Agosto - Domingo 18 | 10:00 Hs"
      },
      {id:6,
        imagenUrl: "https://images.unsplash.com/photo-1665833380686-8b0e41e99dc7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Cine al Aire Libre",
        capacidad: "400 personas",
        lugar: "Parque Sarmiento",
        fecha: "Febrero - Sábado 24 | 21:30 Hs"
      },
      {id:7,
        imagenUrl: "https://images.unsplash.com/photo-1743119626105-8119fde654d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Exposición de Arte",
        capacidad: "100 personas por turno",
        lugar: "Museo Caraffa",
        fecha: "Julio - Viernes 5 | 17:00 Hs"
      },
      {id:8,
        imagenUrl: "https://images.unsplash.com/photo-1470858831619-ca02d796b2a5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Festival de Comida",
        capacidad: "1000 asistentes",
        lugar: "Paseo del Buen Pastor",
        fecha: "Septiembre - Domingo 15 | 12:00 Hs"
      },
      {id:9,
        imagenUrl: "https://images.unsplash.com/photo-1733222814719-9c756a54ad92?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titulo: "Charla TEDx",
        capacidad: "600 lugares",
        lugar: "Auditorio Universidad",
        fecha: "Octubre - Martes 10 | 18:30 Hs"
      }
    ];
  }
}