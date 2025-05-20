import { Component, OnInit } from '@angular/core';
import { OpinionesService } from '../../services/opiniones.service';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css'],
  standalone:false
})
export class OpinionesComponent implements OnInit {
  opiniones: any[] = [];
  nuevaOpinion = {
    ciudad: '',
    puntuacion: 5,
    comentario: ''
  };
  usuarioAutenticado: boolean = false;

constructor(private opinionesService: OpinionesService, private usuarioService: UsuarioService) {}

ngOnInit(): void {
  this.obtenerOpiniones();
  this.usuarioService.usuario$.subscribe(usuario => {
    this.usuarioAutenticado = !!usuario;
  });
}

  obtenerOpiniones() {
    this.opinionesService.getOpiniones().subscribe((data: any) => {
      this.opiniones = data.opiniones;
    });
  }

  enviarOpinion() {
    if (!this.nuevaOpinion.ciudad || !this.nuevaOpinion.comentario || !this.nuevaOpinion.puntuacion) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.opinionesService.enviarOpinion(this.nuevaOpinion).subscribe(() => {
      this.nuevaOpinion = { ciudad: '', puntuacion: 5, comentario: '' };
      this.obtenerOpiniones();
    });
  }
}
