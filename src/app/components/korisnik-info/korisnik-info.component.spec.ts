import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikInfoComponent } from './korisnik-info.component';

describe('KorisnikInfoComponent', () => {
  let component: KorisnikInfoComponent;
  let fixture: ComponentFixture<KorisnikInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KorisnikInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
