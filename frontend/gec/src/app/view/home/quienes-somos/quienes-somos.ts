import { Component } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { NavHome } from '../nav-home/nav-home';
import { ServiceQuienesSomos } from '../../../services/service-quienes-somos/service-quienes-somos';


@Component( {
  selector: 'app-quienes-somos',
  imports: [ Header, Footer, NavHome ],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css'
} )
export class QuienesSomos {
  memberList: any;

  constructor( private ServiceQuienesSomos: ServiceQuienesSomos ) {
    //console.log( "constructor" );
  };
  ngOnInit(): void {

    this.ServiceQuienesSomos.obtenerMiembros().subscribe( {
      next: ( data ) => {
        this.memberList = data;
      },
      error: ( error ) => console.log( error ),
      complete: () => console.info( 'complete' )
    } );
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}
