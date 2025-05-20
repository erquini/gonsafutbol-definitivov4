import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolistasHistoricosComponent } from './futbolistas-historicos.component';

describe('FutbolistasHistoricosComponent', () => {
  let component: FutbolistasHistoricosComponent;
  let fixture: ComponentFixture<FutbolistasHistoricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolistasHistoricosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolistasHistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
