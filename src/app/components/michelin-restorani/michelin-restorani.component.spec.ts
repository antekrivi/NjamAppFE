import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MichelinRestoraniComponent } from './michelin-restorani.component';

describe('MichelinRestoraniComponent', () => {
  let component: MichelinRestoraniComponent;
  let fixture: ComponentFixture<MichelinRestoraniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MichelinRestoraniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MichelinRestoraniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
