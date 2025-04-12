import { Injectable, OnInit } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restoran } from '../interfaces/restoran';
import { RestoranDTO } from '../interfaces/restoranDTO';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  restorani!: Array<Observable<Restoran>>;

  constructor() {
    const restoran1: Restoran = {id: 1, imeRestorana: 'Restoran DP', adresa: 'Adresa 1',
       trenutnoOtvoreno: true, postotakOpterecenosti: 50, brojZvijezdica: 2};
    const restoran2: Restoran = {id: 2, imeRestorana: 'Stari Kotač', adresa: 'Adresa 2',
       trenutnoOtvoreno: false, postotakOpterecenosti: 30, brojZvijezdica: 5};
    const restoran3: Restoran = {id: 3, imeRestorana: 'Restoran GP', adresa: 'Adresa 3',
       trenutnoOtvoreno: true, postotakOpterecenosti: 70, brojZvijezdica: 3};    

    this.restorani = [of(restoran1), of(restoran2), of(restoran3)];

  }

  getRestorani(): Array<Observable<Restoran>> {
    return this.restorani;
  }

  getRestoraniAsArray(): Observable<Restoran[]> {
    return forkJoin(this.restorani);
  }

  getRestoraniWithDTO(): Observable<(Restoran | RestoranDTO)[]> {
    return this.getRestoraniAsArray().pipe(
      map(restorani =>
        restorani.map(restoran => this.mapToDTO(restoran))
      )
    );
  }
  
  private mapToDTO(restoran: Restoran): Restoran | RestoranDTO {
    if (restoran.brojZvijezdica < 3) {
      return restoran; // Vraća originalni Restoran DTO
    } else {
      return {  // Vraća RestoranDTO
        id: restoran.id,
        imeRestorana: restoran.imeRestorana,
        adresa: restoran.adresa,
        trenutnoOtvoreno: restoran.trenutnoOtvoreno,
        postotakOpterecenosti: restoran.postotakOpterecenosti,
        brojZvijezdica: restoran.brojZvijezdica,
        tipKuhinje: 'Talijanska', // Dodaje tip kuhinje
        brojStolova: 20 // Dodaje broj stolova
      } as RestoranDTO;
    }
  }

  sortRestorani(restorani: Restoran[], order: 'asc' | 'desc' = 'asc'): Restoran[] {
    return restorani.sort((a, b) => {
      const comparison = a.brojZvijezdica - b.brojZvijezdica;
      return order === 'asc' ? comparison : -comparison;
    });
  }
}
