/**
 * @component ConfirmacionComponent
 * @description Muestra un mensaje de confirmación después de realizar una compra.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  standalone: false,
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {
  /** Nombre del cliente que realizó la compra */
  nombre: string = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as { nombre: string };
    this.nombre = state ? state.nombre : "Cliente";
  }

  /** Redirige al usuario a la página de inicio */
  volverAlInicio() {
    this.router.navigate(['/home']); 
  }
}

