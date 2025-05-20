import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoConfirmacionComponent } from './contacto-confirmacion.component';

describe('ContactoConfirmacionComponent', () => {
  let component: ContactoConfirmacionComponent;
  let fixture: ComponentFixture<ContactoConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoConfirmacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
