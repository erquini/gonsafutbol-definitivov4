import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolistaDetalleComponent } from './futbolista-detalle.component';

describe('FutbolistaDetalleComponent', () => {
  let component: FutbolistaDetalleComponent;
  let fixture: ComponentFixture<FutbolistaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolistaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolistaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
