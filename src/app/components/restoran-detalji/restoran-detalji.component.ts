import { Component, OnInit } from '@angular/core';
import { Restoran } from '../../interfaces/restoran';
import { ActivatedRoute } from '@angular/router';
import { RestoranService } from '../../services/restoran.service';
import { RestoranDTO } from '../../interfaces/restoranDTO';
import { RecenzijaService } from '../../services/recenzija.service';
import { Recenzija } from '../../interfaces/recenzija';

@Component({
  selector: 'app-restoran-detalji',
  standalone: false,
  templateUrl: './restoran-detalji.component.html',
  styleUrl: './restoran-detalji.component.css'
})
export class RestoranDetaljiComponent implements OnInit {
  restoran!: RestoranDTO;
  private restoranId!: number
  radnoVrijeme: {dan: string, vrijeme: string}[] = [];
  dani: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  restoranZaEdit!: Restoran;
  recenzije!: Array<Recenzija>;

  constructor(private route: ActivatedRoute,
    private restoranService: RestoranService, private recenzijaService : RecenzijaService){  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restoranId = id ? +id : 0;
    this.getRestoran(this.restoranId);
    this.getFullRestoran(this.restoranId);
    this.getRecenzije();
  }

  getRestoran(id: number): void {
    this.restoranService.getRestoranById(id).subscribe({
      next: (restoran) => {
        this.restoran = restoran;
        console.log('Restoran:', restoran);

        if(restoran.radnoVrijeme){
          this.radnoVrijeme = Object.entries(restoran.radnoVrijeme)
            .map(([dan, vrijeme]) => ({ dan, vrijeme })
          );
        }
      },
      error: (error) => {
        console.error('Error fetching restaurant details:', error);
      }
    });
  }

  getFullRestoran(id: number): void {
    this.restoranService.getFullRestoran(id).subscribe({
      next: (restoran) => {
        this.restoranZaEdit = restoran;
        console.log('Restoran za edit:', restoran);
      },
      error: (error) => {
        console.error('Error fetching restaurant details:', error);
      }
    });
  }

  onSubmit() {
    const radnoVrijemeMap: { [key: string]: string } = {};
    this.radnoVrijeme.forEach(item => {
      radnoVrijemeMap[item.dan] = item.vrijeme;
    });

    const updateaniRestoran = {
      ...this.restoranZaEdit,
      ...this.restoran,
    }
    console.log('JSON koji šaljem:', updateaniRestoran);
    this.restoranService.addRestoran(updateaniRestoran).subscribe(() =>{
      console.log('Restoran je uspješno dodan!');
      alert('Restoran je uspješno dodan!');
    })
  }

  getRecenzije(): void {
    this.recenzijaService.getRecenzijaByRestoranId(this.restoranId).subscribe({
      next: (recenzije) => {
        this.recenzije = recenzije;
        console.log('Recenzije:', recenzije);
      }
      , error: (error) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }
}
