import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FutbolService {
  private apiUrl = 'https://v3.football.api-sports.io';
  private apiKey = 'e7c3ef97cd7b8dc53b7d4382b9835465'; 

  constructor(private http: HttpClient) {}


  getLigas(): Observable<any> {
    const headers = new HttpHeaders({
      'x-apisports-key': this.apiKey 
    });

    return this.http.get<any>(`${this.apiUrl}/leagues`, { headers });
  }

  getEquipo(idEquipo: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-apisports-key': this.apiKey
    });

    return this.http.get<any>(`${this.apiUrl}/teams?id=${idEquipo}`, { headers });
  }
}