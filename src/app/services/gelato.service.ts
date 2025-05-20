import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GelatoService {
private apiKey = '54aaed99-a777-4f2b-ad06-f8d258fd9a7e-008f5ab9-978c-4e90-81f5-3692dc0b630a:76561eaa-6078-49b6-8b00-3fc244f260c1';
  private apiUrl = '/gelato-api/v4/templates/render';

  constructor(private http: HttpClient) {}

  generarVistaPrevia(templateId: string, nombre: string, dorsal: string): Observable<{ preview_url: string }> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-API-Key': '54aaed99-a777-4f2b-ad06-f8d258fd9a7e-008f5ab9-978c-4e90-81f5-3692dc0b630a:76561eaa-6078-49b6-8b00-3fc244f260c1'
  });

  const body = {
    template_id: templateId,
    template_data: {
      nombre: nombre,
      dorsal: dorsal
    }
  };

  return this.http.post<{ preview_url: string }>(
    '/gelato-api/v4/templates/render',
    body,
    { headers }
  );
  }}
