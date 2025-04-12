import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restoran } from '../../interfaces/restoran';
import { RestoranService } from '../../services/restoran.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-restorani',
  standalone: false,
  templateUrl: './restorani.component.html',
  styleUrl: './restorani.component.css'
})
export class RestoraniComponent implements OnInit {

  restorani$!: Observable<Restoran[]>;
  odabraniRestoran: Restoran | null = null;
  filteredRestorani: Restoran[] = [];
  filterText: string = '';

  constructor(private restoranService: RestoranService) {
  }
  
  ngOnInit(): void {
    this.restorani$ = this.restoranService.getRestoraniAsArray().pipe(
      map(restorani => this.restoranService.sortRestorani(restorani, 'asc'))
    );

    this.restorani$.subscribe(restorani => {
      this.filteredRestorani = restorani.filter(restoran =>
        restoran.imeRestorana.toLowerCase().includes(this.filterText.toLowerCase())
      );
    });
  }
  
  onRestoranClick(restoran: Restoran): void {
    console.log(`Clicked on restoran: ${restoran.imeRestorana}`);
    this.odabraniRestoran = restoran;
  }

  getOpterecenostClass(postotak: number): string {
    if (postotak < 40) return 'low';
    if (postotak < 70) return 'medium';
    return 'high';
  }

  getOpterecenostText(postotak: number): string {
    if (postotak < 40) return 'Niska';
    if (postotak < 70) return 'Srednja';
    return 'Visoka';
  }
  onPretraziClick(): void {
    this.restorani$.subscribe(restorani => {
      this.filteredRestorani = restorani.filter(restoran =>
        restoran.imeRestorana.toLowerCase().includes(this.filterText.toLowerCase())
      );
    });
  }
}
