import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, Localizacion } from '../interfaces/localizacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {
  
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;

    
  }

  getListLocalizaciones(): Observable<Localizacion[]> {
    const myApiUrl: string = 'localizacion/all'
    return this.http.get<Localizacion[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  deleteLocalizacion(id: ID): Observable<void> {
    const myApiUrl: string = 'localizacion/'
    return this.http.delete<void>(`${this.myAppUrl}${myApiUrl}${id}`)

  }

  crateLocalizacion(producto: Localizacion): Observable<Localizacion> {
    const myApiUrl: string = 'localizacion/'
    return this.http.post<Localizacion>(`${this.myAppUrl}${myApiUrl}`, producto);
  }

  getLocalizacion(id: string): Observable<Localizacion> {
    const myApiUrl: string = 'localizacion/';
    return this.http.get<Localizacion>(`${this.myAppUrl}${myApiUrl}${id}`);
  }

  updateLocalizacion(id: string, product: Localizacion): Observable<Localizacion> {
    const myApiUrl: string = 'localizacion/';
    return this.http.put<Localizacion>(`${this.myAppUrl}${myApiUrl}${id}`, product);
  }

  insertTicketTolocalizacion(idLocalizacion: string, idTicket: string): Observable<Localizacion> {
    const myApiUrl: string = 'localizacion/insert'
    return this.http.post<Localizacion>(`${this.myAppUrl}${myApiUrl}`,{
      "idLocalizacion":`${idLocalizacion}`,
      "idTicket":`${idTicket}`
  });
  }

  getTicketLocalizacion(id: string) {
    const myApiUrl: string = `localizacion/${id}/ticket`;
    return this.http.get<Localizacion[]>(`${this.myAppUrl}${myApiUrl}`)
  }
}

