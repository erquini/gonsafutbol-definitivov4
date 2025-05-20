import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  telefono: string;
  direccion: string;
  avatar: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: false
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioEditando: Usuario | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Usuario[]>('http://localhost/gonsa-futbol-api/obtener_usuarios.php').subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.http.delete(`http://localhost/gonsa-futbol-api/eliminar_usuario.php?id=${id}`).subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      });
    }
  }

  editar(u: Usuario) {
    this.usuarioEditando = { ...u };
  }

  cancelarEdicion() {
    this.usuarioEditando = null;
  }

  guardarCambios() {
    if (!this.usuarioEditando) return;
    this.http.post('http://localhost/gonsa-futbol-api/editar_usuario.php', this.usuarioEditando).subscribe(() => {
      this.ngOnInit();
      this.usuarioEditando = null;
    });
  }

  getRutaImagen(avatar: string): string {
    return avatar?.startsWith('uploads/')
      ? `http://localhost/gonsa-futbol-api/${avatar}`
      : 'assets/' + avatar;
  }
}
