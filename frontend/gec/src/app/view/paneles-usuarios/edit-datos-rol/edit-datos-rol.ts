import { Component, OnInit } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { NavHome } from '../../home/nav-home/nav-home';
import { Footer } from '../../../shared/footer/footer';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDatos } from '../../../services/service-datos/service-datos';
import { Auth } from '../../../services/service-autenticacion/auth.service';
import { SAlert } from '../../../services/service-alert/s-alert';
import { ClassDatos } from '../../../model/datos';
import { classUsuario } from '../../../model/usuario';

@Component( {
  selector: 'app-edit-datos-rol',
  standalone: true,
  imports: [ Header, NavHome, Footer, CommonModule, FormsModule ],
  templateUrl: './edit-datos-rol.html',
  styleUrls: [ './edit-datos-rol.css' ]
} )
export class EditDatosRol implements OnInit {
  datos = {
    nombre: '',
    apellido: '',
    empresa: '',
    cuil: ''
  };

  enviando = false;
  mensajeVisible = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' = 'success';

  // Variables para modo edición
  modoEdicion = false;
  idDatosExistente: number | null = null;
  cargandoDatos = true;

  constructor(
    private datosService: ServiceDatos,
    private auth: Auth,
    private alertService: SAlert
  ) { }

  ngOnInit(): void {
    //console.log( 'Rol actual:', this.auth.role );
    this.cargarDatosExistentes();
  }

  // Carga los datos existentes del usuario si ya tiene datos registrados
  cargarDatosExistentes(): void {
    const userId = this.auth.usuarioLogueadoId();
    if ( !userId ) {
      this.cargandoDatos = false;
      return;
    }

    // Obtener todos los datos y buscar los del usuario actual
    this.datosService.obtenerDatos().subscribe( {
      next: ( todosDatos ) => {
        const datosUsuario = todosDatos.find(
          d => d.getUsuario().getId() === userId
        );

        if ( datosUsuario ) {
          // Usuario ya tiene datos, cargar en el formulario
          this.modoEdicion = true;
          this.idDatosExistente = datosUsuario.getId_datos();
          this.datos = {
            nombre: datosUsuario.getNombre(),
            apellido: datosUsuario.getApellido(),
            empresa: datosUsuario.getEmpresa(),
            cuil: datosUsuario.getCuil()
          };
          console.log( 'Id:', this.idDatosExistente );
        } else {
          console.log( 'No hay datos previos' );
        }

        this.cargandoDatos = false;
      },
      error: ( error ) => {
        console.error( 'Error al cargar datos:', error );
        this.cargandoDatos = false;
      }
    } );
  }

  onSubmit( form: any ): void {
    if ( form.invalid ) {
      Object.keys( form.controls ).forEach( key => {
        form.controls[ key ].markAsTouched();
      } );
      return;
    }

    const userId = this.auth.usuarioLogueadoId();
    if ( !userId ) {
      this.mostrarMensaje( 'Debes iniciar sesión', 'error' );
      return;
    }

    this.enviando = true;

    // Crear instancia de usuario
    const usuario = classUsuario.fromJson( {
      id: userId,
      email: '',
      contrasenia: '',
      fechaRegistro: new Date(),
      cuentaActiva: true,
      rol: 'USUARIO'
    } );

    // Crear instancia de ClassDatos
    const dato = new ClassDatos(
      this.idDatosExistente ?? 0,
      this.datos.nombre,
      this.datos.apellido,
      this.datos.empresa,
      this.datos.cuil,
      usuario
    );

    // Decidir si crear o actualizar
    if ( this.modoEdicion && this.idDatosExistente ) {
      this.actualizarDatos( dato );
    } else {
      this.crearDatos( dato, form );
    }
  }

  // Crea datos
  private crearDatos( dato: ClassDatos, form: any ): void {
    this.datosService.crearDato( dato ).subscribe( {
      next: ( response ) => {
        console.log( 'Datos creados exitosamente:', response );
        console.log( 'ID asignado:', response.getId_datos() );

        this.mostrarMensaje( 'Datos guardados correctamente', 'success' );

        // Cambiar a modo edición
        this.modoEdicion = true;
        this.idDatosExistente = response.getId_datos();

        // Asignar rol de gestor
        this.auth.setRole( 'GESTOR' );

        this.enviando = false;
      },
      error: ( error ) => {
        console.error( '❌ Error al crear datos:', error );
        const errorMsg = error.error?.message || 'Error al guardar los datos';
        this.mostrarMensaje( errorMsg, 'error' );
        this.enviando = false;
      }
    } );
  }

  /**
   * Actualiza datos existentes
   */
  private actualizarDatos( dato: ClassDatos ): void {
    if ( !this.idDatosExistente ) return;

    this.datosService.actualizarDato( this.idDatosExistente, dato ).subscribe( {
      next: ( response ) => {
        console.log( '✅ Datos actualizados exitosamente:', response );

        this.mostrarMensaje( 'Datos actualizados correctamente', 'success' );
        this.enviando = false;
      },
      error: ( error ) => {
        console.error( '❌ Error al actualizar datos:', error );
        const errorMsg = error.error?.message || 'Error al actualizar los datos';
        this.mostrarMensaje( errorMsg, 'error' );
        this.enviando = false;
      }
    } );
  }

  limpiarFormulario( form: any ): void {
    if ( this.modoEdicion ) {
      // Si está en modo edición, recargar los datos originales
      this.cargarDatosExistentes();
    } else {
      // Si es creación, limpiar el formulario
      this.datos = {
        nombre: '',
        apellido: '',
        empresa: '',
        cuil: ''
      };
      form.resetForm();
    }
  }

  mostrarMensaje( texto: string, tipo: 'success' | 'error' ): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    this.mensajeVisible = true;

    setTimeout( () => {
      this.mensajeVisible = false;
    }, 4000 );
  }
}