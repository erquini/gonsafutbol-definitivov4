import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { OpinionesService } from '../../services/opiniones.service';

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

  opiniones: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private opinionesService: OpinionesService
  ) {}

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

    this.opinionesService.getOpiniones().subscribe((res: any) => {
      this.opiniones = this.obtenerAleatorias(res.opiniones, 3);
    });
  }

  obtenerAleatorias(lista: any[], cantidad: number): any[] {
    return [...lista].sort(() => Math.random() - 0.5).slice(0, cantidad);
  }

  guardarCambios(): void {
    this.mensaje = '';
    this.error = '';

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
}
