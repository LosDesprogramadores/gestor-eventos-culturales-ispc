import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const API = 'http://localhost:3000';
const SESSION_KEY = 'gec.session';

export type UiRole = 'ANON' | 'USER' | 'GESTOR';

export interface Session {
  authenticated: boolean;
  role: UiRole;
  user: { id: number; email: string } | null;
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);

  private _session: Session = this.loadSession() ?? {
    authenticated: false,
    role: 'ANON',
    user: null
  };

  get session(): Session { return this._session; }
  get role(): UiRole { return this._session.role; }

  async login(email: string, password: string): Promise<Session> {
    const usuarios: any[] = await firstValueFrom(
      this.http.get<any[]>(`${API}/usuarios`, { params: { email, password, _limit: 1 } })
    );

    const u = usuarios?.[0];
    if (!u) throw new Error('Credenciales inválidas');
    if (!u.cuentaActiva) throw new Error('Cuenta inactiva');


    const uiRole: UiRole =
      u.id_rol === 1 ? 'GESTOR' :
      u.id_rol === 2 ? 'USER'   : 'ANON';

    this._session = {
      authenticated: true,
      role: uiRole,
      user: { id: u.id_usuario, email: u.email }
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(this._session));
    return this._session;
  }

  logout(): void {
    this._session = { authenticated: false, role: 'ANON', user: null };
    localStorage.removeItem(SESSION_KEY);
  }

  private loadSession(): Session | null {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null'); }
    catch { return null; }
  }

  usuario(){
    
  }
}
