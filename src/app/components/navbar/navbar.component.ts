import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent implements OnInit {
  usuarioLogueado: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.usuarioService.usuario$.subscribe(usuario => {
    this.usuarioLogueado = usuario;
  });
}

cerrarSesion(): void {
  this.usuarioService.cerrarSesion().subscribe(() => {
    this.router.navigate(['/home']);
  });
}

}
