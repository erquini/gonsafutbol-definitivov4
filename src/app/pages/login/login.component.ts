import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
opiniones = [
  {
    texto: 'Revisar mis pedidos es muy fácil y rápido. Todo está bien organizado en mi cuenta.',
    autor: 'Marcos R. de Valladolid'
  },
  {
    texto: 'Con mi sesión iniciada, hago los pedidos mucho más rápido. Muy cómodo.',
    autor: 'Paula T. de Málaga'
  },
  {
    texto: 'Me encanta poder guardar mis camisetas favoritas para no perderlas de vista.',
    autor: 'Sergio H. de Alicante'
  }
];



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
