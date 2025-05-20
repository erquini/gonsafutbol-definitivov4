/**
 * @module FooterComponent
 * @description Módulo que representa el pie de página de la aplicación. 
 * Contiene enlaces y redes sociales.
 */
import { Component } from '@angular/core';

/**
 * @component FooterComponent
 * @description Componente que muestra el pie de página con enlaces a secciones principales y redes sociales.
 */
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  /**
   * @constructor
   * @description Inicializa el componente Footer.
   */
  constructor() {}

}
