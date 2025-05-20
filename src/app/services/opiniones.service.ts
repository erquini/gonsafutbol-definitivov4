import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  private apiUrl = 'http://localhost/gonsa-futbol-api/opiniones.php';

  constructor(private http: HttpClient) {}

  getOpiniones() {
    return this.http.get(this.apiUrl + '?accion=listar');
  }

  enviarOpinion(data: any) {
    return this.http.post(this.apiUrl + '?accion=crear', data, { withCredentials: true });
  }
}
