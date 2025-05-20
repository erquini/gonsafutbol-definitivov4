import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto-confirmacion',
  templateUrl: './contacto-confirmacion.component.html',
  standalone: false,
  styleUrls: ['./contacto-confirmacion.component.css']
})
export class ContactoConfirmacionComponent {
  constructor(private router: Router) {}

  volverInicio() {
    this.router.navigate(['/home']);
  }
}
