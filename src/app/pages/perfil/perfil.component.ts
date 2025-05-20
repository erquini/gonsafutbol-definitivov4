import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: false
})
export class PerfilComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  direccion: string = '';
  telefono: string = '';
  avatar: string = '';
  archivoSeleccionado: File | null = null;

  mensaje: string = '';
  error: string = '';
  modoEdicion: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerPerfil().subscribe(res => {
      if (res.status === 'ok') {
        const datos = res.datos;
        this.nombre = datos.nombre;
        this.email = datos.email;
        this.direccion = datos.direccion;
        this.telefono = datos.telefono;
        this.avatar = datos.avatar || '';
      } else {
        this.error = res.mensaje;
      }
    });
  }

  guardarCambios(): void {
    this.mensaje = '';
    this.error = '';

    console.log('➡ Enviando:', {
      nombre: this.nombre,
      email: this.email,
      direccion: this.direccion,
      telefono: this.telefono
    });

    if (!this.nombre || !this.email || !this.direccion || !this.telefono) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.usuarioService.actualizarPerfil({
      nombre: this.nombre,
      email: this.email,
      direccion: this.direccion,
      telefono: this.telefono
    }).subscribe(res => {
      console.log('⬅ Respuesta:', res);
      if (res.status === 'ok') {
        this.mensaje = '✅ Perfil actualizado correctamente';
        this.modoEdicion = false;
      } else {
        this.error = res.mensaje || '❌ Error al actualizar';
      }
    });
  }

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirAvatar(): void {
    if (!this.archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('avatar', this.archivoSeleccionado);

    this.usuarioService.subirAvatar(formData).subscribe(res => {
      if (res.status === 'ok') {
        this.avatar = res.ruta;
        this.mensaje = '✅ Imagen actualizada correctamente';
      } else {
        this.error = res.mensaje || '❌ Error al subir la imagen';
      }
    });
  }

  alternarEdicion(): void {
    this.modoEdicion = !this.modoEdicion;
  }
  opiniones = [
  {
    texto: '¡Excelente calidad y envío rapidísimo! Me encantó mi camiseta personalizada.',
    autor: 'Andrea G. de Barcelona'
  },
  {
    texto: 'Muy buena atención al cliente. Me ayudaron a corregir mi pedido sin problemas.',
    autor: 'Carlos R. de Madrid'
  },
  {
    texto: 'La experiencia de personalización es muy divertida. ¡Repetiré pronto!',
    autor: 'Lucía M. de Sevilla'
  }
];

}
