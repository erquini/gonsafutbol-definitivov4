import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { OpinionesService } from '../../services/opiniones.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: false
})
export class RegistroComponent implements OnInit {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  direccion = '';
  telefono = '';
  mensajeError = '';
  mensajeExito = '';

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

  registrar() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.nombre || !this.email || !this.password || !this.confirmPassword || !this.direccion || !this.telefono) {
      this.mensajeError = '⚠️ Todos los campos son obligatorios.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.mensajeError = '⚠️ Introduce un correo electrónico válido.';
      return;
    }

    if (this.password.length < 6) {
      this.mensajeError = '⚠️ La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.mensajeError = '⚠️ Las contraseñas no coinciden.';
      return;
    }

    if (!/^[0-9]{9}$/.test(this.telefono)) {
      this.mensajeError = '⚠️ El número de teléfono debe tener 9 dígitos.';
      return;
    }

    const usuario = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      direccion: this.direccion,
      telefono: this.telefono
    };

    this.usuarioService.registrarUsuario(usuario).subscribe({
      next: (res: any) => {
        if (res.status === 'ok') {
          this.mensajeExito = '✅ Registro exitoso. Ahora puedes iniciar sesión.';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.mensajeError = res.mensaje || '⚠️ Error al registrar.';
        }
      },
      error: () => {
        this.mensajeError = '❌ Error al conectar con el servidor.';
      }
    });
  }
}
