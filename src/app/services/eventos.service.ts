import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_BASE = '/api/v4'; // usamos el proxy
const TOKEN = 'de044003516d4ef1b3df4ce18c220d97';

const headers = {
  headers: {
    'X-Auth-Token': TOKEN,
    'Accept': 'application/json'
  }
};

@Injectable({ providedIn: 'root' })
export class EventosService {

  private cacheCompeticiones: any = null;
  private cacheEquiposPorComp: Map<string, any> = new Map();
  private cachePartidosPorEquipo: Map<number, any> = new Map();
  private cachePartidosPorComp: Map<string, any> = new Map();

  constructor(private http: HttpClient) {}

  // Obtener todas las competiciones principales (con caché)
  getCompeticiones(): Observable<any> {
    if (this.cacheCompeticiones) {
      return of(this.cacheCompeticiones);
    }

    return this.http.get(`${API_BASE}/competitions`, headers).pipe(
      tap(data => this.cacheCompeticiones = data)
    );
  }

  // Obtener partidos programados por código de competición (con caché)
  getPartidosPorCompeticion(codigo: string): Observable<any> {
    if (this.cachePartidosPorComp.has(codigo)) {
      return of(this.cachePartidosPorComp.get(codigo));
    }

    const url = `${API_BASE}/competitions/${codigo}/matches?status=SCHEDULED`;
    return this.http.get(url, headers).pipe(
      tap(data => this.cachePartidosPorComp.set(codigo, data))
    );
  }

  // Obtener equipos por competición (con caché)
  getEquiposPorCompeticion(codigo: string): Observable<any> {
    if (this.cacheEquiposPorComp.has(codigo)) {
      return of(this.cacheEquiposPorComp.get(codigo));
    }

    const url = `${API_BASE}/competitions/${codigo}/teams`;
    return this.http.get(url, headers).pipe(
      tap(data => this.cacheEquiposPorComp.set(codigo, data))
    );
  }

  // Obtener partidos por equipo (con caché)
  getPartidosPorEquipo(idEquipo: number): Observable<any> {
    if (this.cachePartidosPorEquipo.has(idEquipo)) {
      return of(this.cachePartidosPorEquipo.get(idEquipo));
    }

    const url = `${API_BASE}/teams/${idEquipo}/matches?status=SCHEDULED`;
    return this.http.get(url, headers).pipe(
      tap(data => this.cachePartidosPorEquipo.set(idEquipo, data))
    );
  }
}
