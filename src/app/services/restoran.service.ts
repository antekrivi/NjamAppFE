import { Injectable, OnInit } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { catchError, map, tap,  } from 'rxjs/operators';
import { Restoran } from '../interfaces/restoran';
import { RestoranDTO } from '../interfaces/restoranDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  private restoraniUrl = 'http://localhost:8080/restoran';
  restorani!: Array<Observable<Restoran>>;

  httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json',})
  };

  constructor(private http : HttpClient) {  }

  getRestorani(): Observable<Restoran[]> {
    return this.http.get<Restoran[]>(this.restoraniUrl)
    .pipe(
      tap(_ => console.log('fetched restorani')),
      catchError(this.handleError<Restoran[]>('getRestorani', []))
    );
  }
  getRestoranById(id: number): Observable<Restoran> {
    const params = {id: id};
    return this.http.get<Restoran>(this.restoraniUrl, {params})
    .pipe(
      tap(_ => console.log(`fetched restoran id=${id}`)),
      catchError(this.handleError<Restoran>(`getRestoranById id=${id}`))
    );
  }
  getFullRestoran(id: number): Observable<Restoran> {
    const params = {id: id};
    return this.http.get<Restoran>(`${this.restoraniUrl}/full`, {params})
    .pipe(
      tap(_ => console.log(`fetched restoran id=${id}`)),
      catchError(this.handleError<Restoran>(`getRestoranById id=${id}`))
    );
  }
  getMichelinRestorani(): Observable<Restoran[]> {
    return this.http.get<Restoran[]>(`${this.restoraniUrl}/michelin`)
    .pipe(
      tap(_ => console.log('fetched restorani')),
      catchError(this.handleError<Restoran[]>('getRestorani', []))
    );
  }

  addRestoran(restoran: Restoran): Observable<Restoran> {
    return this.http.post<Restoran>(`${this.restoraniUrl}/spremi`, restoran, this.httpOptions);
  }

  updateRestoran(restoran: Restoran): Observable<any> {
    const url = `${this.restoraniUrl}/${restoran.id}`;
    return this.http.put(url, restoran, this.httpOptions).pipe(
      tap(_ => console.log(`updated restoran id=${restoran.id}`)),
      catchError(this.handleError<any>('updateRestoran'))
    );
  }

  deleteRestoran(id: number): Observable<Restoran> {
    return this.http.delete<Restoran>(`${this.restoraniUrl}/${id}`, this.httpOptions);
  }
  

  getRestoraniWithDTO(): Observable<(Restoran | RestoranDTO)[]> {
    return this.getRestorani().pipe(
      map(restorani =>
        restorani.map(restoran => this.mapToDTO(restoran))
      )
    );
  }
  
  private mapToDTO(restoran: Restoran): Restoran | RestoranDTO {
    if (restoran.michelinZvijezdice < 3) {
      return restoran; // Vraća originalni Restoran DTO
    } else {
      return {  // Vraća RestoranDTO
        id: restoran.id,
        imeRestorana: restoran.imeRestorana,
        adresa: restoran.adresa,
        trenutnoOtvoreno: restoran.trenutnoOtvoreno,
        postotakOpterecenosti: restoran.postotakOpterecenosti,
        michelinZvijezdice: restoran.michelinZvijezdice
      } as RestoranDTO;
    }
  }

  sortRestorani(restorani: RestoranDTO[], order: 'asc' | 'desc' = 'asc'): RestoranDTO[] {
    return restorani.sort((a, b) => {
      const comparison = a.michelinZvijezdice - b.michelinZvijezdice;
      return order === 'asc' ? comparison : -comparison;
    });
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
