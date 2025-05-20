import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone:false
})
export class NavbarComponent implements OnInit {
  usuario: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si el observable emite datos (por login normal)
    this.usuarioService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });

    // Recuperar desde localStorage por si se recarga la página
    const guardado = localStorage.getItem('usuario');
    if (guardado && !this.usuario) {
      this.usuario = JSON.parse(guardado);
    }
  }

  cerrarSesion(): void {
    this.usuarioService.cerrarSesion().subscribe(() => {
      this.usuario = null;
      this.router.navigate(['/home']);
    });
  }
}
