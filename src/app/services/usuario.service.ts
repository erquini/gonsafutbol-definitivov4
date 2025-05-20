// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost/gonsa-futbol-api';

  private usuarioSubject = new BehaviorSubject<string | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.obtenerUsuarioActual().subscribe(); // Inicializa estado
  }

  registrarUsuario(usuario: { nombre: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/registro.php`, usuario, { withCredentials: true });
  }

  iniciarSesion(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { email, password }, { withCredentials: true }).pipe(
      tap((res: any) => {
        if (res.status === 'ok') {
          this.usuarioSubject.next(res.usuario); // <- Actualiza estado
        }
      })
    );
  }

  obtenerUsuarioActual(): Observable<string | null> {
    return this.http.get<{ usuario: string | null }>(`${this.apiUrl}/obtener-usuario.php`, { withCredentials: true }).pipe(
      map(res => {
        this.usuarioSubject.next(res.usuario); // <- Actualiza estado
        return res.usuario;
      }),
      catchError(err => {
        console.error('Error obteniendo usuario:', err);
        this.usuarioSubject.next(null);
        return of(null);
      })
    );
  }

cerrarSesion(): Observable<any> {
  return this.http.get(`${this.apiUrl}/cerrar-sesion.php`, { withCredentials: true }).pipe(
    tap(() => this.usuarioSubject.next(null)) // Esto debe ejecutarse
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


}
