import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost/gonsa-futbol-api';

  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    // Recuperar usuario desde localStorage al iniciar
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioSubject.next(JSON.parse(usuarioGuardado));
    }
  }

  registrarUsuario(usuario: { nombre: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/registro.php`, usuario, { withCredentials: true });
  }

  iniciarSesion(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { email, password }, { withCredentials: true }).pipe(
      tap((res: any) => {
        if (res.status === 'ok') {
          localStorage.setItem('usuario', JSON.stringify(res.usuario)); // Guardar en localStorage
          this.usuarioSubject.next(res.usuario);
        }
      })
    );
  }

  obtenerUsuarioActual(): Observable<any> {
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      const usuario = JSON.parse(guardado);
      this.usuarioSubject.next(usuario);
      return of(usuario);
    } else {
      return this.http.get<{ usuario: any }>(`${this.apiUrl}/obtener-usuario.php`, { withCredentials: true }).pipe(
        map(res => {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.usuarioSubject.next(res.usuario);
          return res.usuario;
        }),
        catchError(err => {
          console.error('Error obteniendo usuario:', err);
          this.usuarioSubject.next(null);
          return of(null);
        })
      );
    }
  }

  cerrarSesion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cerrar-sesion.php`, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('usuario'); // Borrar de localStorage
        this.usuarioSubject.next(null);
      })
    );
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener-perfil.php`, { withCredentials: true });
  }

  actualizarPerfil(datos: { nombre: string; email: string; direccion: string; telefono: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/actualizar-perfil.php`, datos, { withCredentials: true });
  }

  subirAvatar(archivo: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/subir-avatar.php`, archivo, { withCredentials: true });
  }

  setUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  getUsuarioActualLocal(): any {
    return this.usuarioSubject.getValue();
  }
}
