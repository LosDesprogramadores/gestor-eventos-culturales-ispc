import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { classUsuario } from '../../model/usuario';

const API = 'http://127.0.0.1:8000/api';
const SESSION_KEY = 'gec.session';

export type UiRole = 'ANON' | 'USER' | 'GESTOR';

export interface Session {
  authenticated: boolean;
  role: UiRole;
  user: { id: number; email: string; } | null;
}

export interface LoginResponse {
  message: string;
  user_id: number;
  id_rol: number;
}

@Injectable( { providedIn: 'root' } )
export class Auth {
  private http = inject( HttpClient );

  private _session: Session = this.loadSession() ?? {
    authenticated: false,
    role: 'ANON',
    user: null
  };

  get session(): Session { return this._session; }
  get role(): UiRole { return this._session.role; }

  setRole( newRole: UiRole ): void {
    this._session = {
      ...this._session,
      role: newRole
    };
    localStorage.setItem( SESSION_KEY, JSON.stringify( this._session ) );
  }

  async login( email: string, password: string ): Promise<Session> {
    const response: LoginResponse = await firstValueFrom(
      this.http.post<LoginResponse>( `${ API }/usuarios/login/`, { email, password, _limit: 1 } )
    );
    console.log( response );

    if ( !response ) throw new Error( 'Credenciales inválidas' );
    /*  if (!usuarios.cuentaActiva) throw new Error('Cuenta inactiva'); */


    const uiRole: UiRole =
      response.id_rol === 1 ? 'GESTOR' :
        response.id_rol === 2 ? 'USER' : 'ANON';

    this._session = {
      authenticated: true,
      role: uiRole,
      user: { id: response.user_id, email: email }
    };
    localStorage.setItem( SESSION_KEY, JSON.stringify( this._session ) );
    return this._session;
  }

  logout(): void {
    this._session = { authenticated: false, role: 'ANON', user: null };
    localStorage.removeItem( SESSION_KEY );
  }

  private loadSession(): Session | null {
    try { return JSON.parse( localStorage.getItem( SESSION_KEY ) ?? 'null' ); }
    catch { return null; }
  }

  usuarioLogueadoId(): number | null {
    return this.session.user?.id ?? null;
  }
}
