import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RestoranDTO } from '../../interfaces/restoranDTO';
import { RestoranService } from '../../services/restoran.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-michelin-restorani',
  standalone: false,
  templateUrl: './michelin-restorani.component.html',
  styleUrl: './michelin-restorani.component.css'
})
export class MichelinRestoraniComponent {

  
  restorani$!: Observable<RestoranDTO[]>;
  filteredRestorani: RestoranDTO[] = [];
  filterText: string = '';

  constructor(private restoranService: RestoranService, private router: Router){}
  
  ngOnInit(): void {
    this.getRestorani();
  }

  getRestorani(): void {
    this.restorani$ = this.restoranService.getMichelinRestorani().pipe(
      map(restorani => this.restoranService.sortRestorani(restorani, 'asc'))
    );
    this.restorani$.subscribe(restorani => {
      this.filteredRestorani = restorani.filter(restoran =>
        restoran.imeRestorana.toLowerCase().includes(this.filterText.toLowerCase())
      );
    });
  }

  onDeleteClick(restoran: RestoranDTO): void {
    this.restoranService.deleteRestoran(restoran.id).subscribe({
      next: () => {
        console.log('Restoran uspješno obrisan!');
        this.getRestorani();
      },
      error: (err) => console.error('Greška pri brisanju restorana:', err)
    });
  }

  
  onRestoranClick(restoran: RestoranDTO): void {
    this.router.navigate(['restorani-detalji', restoran.id]);
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
