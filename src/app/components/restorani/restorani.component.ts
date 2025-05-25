import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restoran } from '../../interfaces/restoran';
import { RestoranService } from '../../services/restoran.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestoranDTO } from '../../interfaces/restoranDTO';
import { get } from 'http';

@Component({
  selector: 'app-restorani',
  standalone: false,
  templateUrl: './restorani.component.html',
  styleUrl: './restorani.component.css'
})
export class RestoraniComponent implements OnInit {

  restorani$!: Observable<RestoranDTO[]>;
  filteredRestorani: RestoranDTO[] = [];
  filterText: string = '';

  restoranForm!: FormGroup;

  constructor(private restoranService: RestoranService, private router: Router,
    private fb: FormBuilder) {
      this.restoranForm = this.fb.group({
        imeRestorana: ['', Validators.required],
        adresa: ['', Validators.required],
        brojTelefona: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        kratkiOpis: ['', Validators.required],
        postotakOpterecenosti: [0, Validators.required],
        prosVrijemeDostave: [0, Validators.required],
        prosOcjenaKupca: [0, Validators.required],
        maxBrojNarudzbi: [0, Validators.required],
        michelinZvijezdice: [0, Validators.required],
        trenutnoOtvoreno: [true, Validators.required],
        brojStolova: [1, Validators.required],
        godinaOsnivanja: [2025, Validators.required],
        radnoVrijeme: this.fb.group({
          Monday: ['10-22'],
          Tuesday: ['10-22'],
          Wednesday: ['10-22'],
          Thursday: ['10-22'],
          Friday: ['10-23'],
          Saturday: ['11-23'],
          Sunday: ['Closed']
        }),

      });
     }
  
  ngOnInit(): void {
    this.getRestorani();

    
  }

  onSubmit(): void {
    if (this.restoranForm.valid) {
      const formValue = this.restoranForm.value;

      const noviRestoran: Restoran = {
        ...formValue,
        michelinZvijezdice: Number(formValue.michelinZvijezdice),
        radnoVrijeme: Object.fromEntries(new Map(Object.entries(formValue.radnoVrijeme)))
      };

      this.restoranService.addRestoran(noviRestoran).subscribe({
        next: () => {
          console.log('Restoran uspješno dodan!');
          console.log('Dodani restoran:', noviRestoran);
          this.getRestorani();
          this.restoranForm.reset();
        },
        error: (err) => console.error('Greška pri dodavanju restorana:', err)
      });
    }
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

  getRestorani(): void {
    this.restorani$ = this.restoranService.getRestoraniWithDTO().pipe(
      map(restorani => this.restoranService.sortRestorani(restorani, 'asc'))
    );
    this.restorani$.subscribe(restorani => {
      this.filteredRestorani = restorani.filter(restoran =>
        restoran.imeRestorana.toLowerCase().includes(this.filterText.toLowerCase())
      );
    });
  }
  prikaziOtvoreneRestorane(): void {
    this.restorani$ = this.restoranService.getTrenutnoOtvoreniRestorani().pipe(
      map(restorani => this.restoranService.sortRestorani(restorani, 'asc'))
    );
    this.restorani$.subscribe(restorani => {
      this.filteredRestorani = restorani.filter(restoran =>
        restoran.imeRestorana.toLowerCase().includes(this.filterText.toLowerCase())
      );
    });
  }
  prikaziNajboljeRestorane(): void {
    this.restorani$ = this.restoranService.getNajboljeOcijenjeniRestorani().pipe(
      map(restorani => this.restoranService.sortRestorani(restorani, 'asc'))
    );
    this.restorani$.subscribe(restorani => {
      this.filteredRestorani = restorani.filter(restoran =>
        restoran.imeRestorana.toLowerCase().includes(this.filterText.toLowerCase())
      );
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
