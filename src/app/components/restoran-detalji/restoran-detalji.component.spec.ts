import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoranDetaljiComponent } from './restoran-detalji.component';

describe('RestoranDetaljiComponent', () => {
  let component: RestoranDetaljiComponent;
  let fixture: ComponentFixture<RestoranDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestoranDetaljiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoranDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
