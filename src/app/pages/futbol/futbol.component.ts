import { Component, OnInit } from '@angular/core';
import { FutbolService } from '../../services/futbol.service';  // Importamos el servicio para obtener datos de fútbol

@Component({
  selector: 'app-futbol',
  templateUrl: './futbol.component.html',
  styleUrls: ['./futbol.component.css'],
  standalone: false
})
export class FutbolComponent implements OnInit {
  ligas: any[] = []; 
  equipo: any;  // Variable para almacenar la información del equipo
  

  constructor(private futbolService: FutbolService) {}  // Inyectamos el servicio del fútbol

  ngOnInit() {
    // Llamamos al servicio para obtener las ligas y manejamos la respuesta
    this.futbolService.getLigas().subscribe(
      (datos) => { 
        this.ligas = datos.response;  // Asignamos los datos de las ligas a la variable ligas
      },
      (error) => { 
        console.error('Error al obtener las ligas', error);  // Mostramos error si ocurre uno
      }
    );

    // Llamamos al servicio para obtener la información de un equipo específico
    this.futbolService.getEquipo(541).subscribe(
      (datos) => { 
        this.equipo = datos.response[0];  // Asignamos el primer equipo recibido a la variable equipo
      },
      (error) => { 
        console.error('Error al obtener el equipo', error);  // Mostramos error si ocurre uno
      }
    );
  }
}