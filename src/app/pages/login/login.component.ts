import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { OpinionesService } from '../../services/opiniones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  mensajeError: string = '';
  opiniones: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private opinionesService: OpinionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.opinionesService.getOpiniones().subscribe((res: any) => {
      this.opiniones = this.obtenerAleatorias(res.opiniones, 3);
    });
  }

  obtenerAleatorias(lista: any[], cantidad: number): any[] {
    return [...lista].sort(() => Math.random() - 0.5).slice(0, cantidad);
  }

  iniciarSesion() {
    this.mensajeError = '';

    if (this.email.trim() && this.password.trim()) {
      this.usuarioService.iniciarSesion(this.email, this.password).subscribe({
        next: (res: any) => {
          if (res.status === 'ok') {
            alert('✅ Inicio de sesión exitoso.');
            this.router.navigate(['/home']);
          } else {
            this.mensajeError = res.mensaje || '⚠️ Credenciales incorrectas.';
          }
        },
        error: () => {
          this.mensajeError = '❌ Error al conectar con el servidor.';
        }
      });
    } else {
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';
    }
  }
}
