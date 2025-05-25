import { Injectable } from '@angular/core';
import { Recenzija } from '../interfaces/recenzija';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecenzijaDTO } from '../interfaces/recenzijaDTO';

@Injectable({
  providedIn: 'root'
})
export class RecenzijaService {

  private recenzijeUrl = 'http://localhost:8080/recenzija';
  recenzije!: Array<Observable<RecenzijaDTO>>;
  httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json',})
  };

  constructor(private http: HttpClient) {}

  getRecenzije(): Observable<RecenzijaDTO[]> {
    return this.http.get<RecenzijaDTO[]>(this.recenzijeUrl);
  }

  getRecenzijaByRestoranId(id: number): Observable<Recenzija[]> {
    const params = {restoranId: id};
    return this.http.get<Recenzija[]>(this.recenzijeUrl, {params});
  }

  deleteRecenzija(id: number): Observable<void> {
    return this.http.delete<void>(`${this.recenzijeUrl}/${id}`);
  }

  editRecenzija(recenzija: Recenzija): Observable<Recenzija> {
    return this.http.put<Recenzija>(`${this.recenzijeUrl}/${recenzija.id}`, recenzija, this.httpOptions);
  }
  
  spremiRecenziju(recenzija: Recenzija): Observable<Recenzija> {
    return this.http.post<Recenzija>(this.recenzijeUrl, recenzija, this.httpOptions);
  }
}
