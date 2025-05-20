import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../../interfaces/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: false
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoEditando: Producto | null = null;

  // Para nuevo producto
  nuevoProducto: any = {
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: ''
  };
  imagenSeleccionada!: File;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Producto[]>('http://localhost/gonsa-futbol-api/obtener_productos.php')
      .subscribe(data => {
        this.productos = data;
      });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar producto permanentemente?')) {
      this.http.delete(`http://localhost/gonsa-futbol-api/eliminar_producto.php?id=${id}`)
        .subscribe(() => {
          this.productos = this.productos.filter(p => p.id !== id);
        });
    }
  }

  editar(p: Producto) {
    this.productoEditando = { ...p };
  }

  guardarCambios() {
    if (this.productoEditando) {
      this.http.post('http://localhost/gonsa-futbol-api/editar_producto.php', this.productoEditando)
        .subscribe(() => {
          this.ngOnInit();
          this.productoEditando = null;
        });
    }
  }

  cancelarEdicion() {
    this.productoEditando = null;
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  crearProducto() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('stock', this.nuevoProducto.stock.toString());
    formData.append('categoria', this.nuevoProducto.categoria);
    formData.append('imagen', this.imagenSeleccionada);

    this.http.post<any>('http://localhost/gonsa-futbol-api/crear_producto.php', formData)
      .subscribe((res) => {
        alert('✅ Producto creado');
        this.ngOnInit();
        this.nuevoProducto = { nombre: '', precio: 0, stock: 0, categoria: '' };
      });
  }
  getRutaImagen(ruta: string): string {
  if (ruta.startsWith('uploads/')) {
    return 'http://localhost/gonsa-futbol-api/' + ruta;
  } else {
    return ruta; // ya es 'assets/...'
  }
}

}
