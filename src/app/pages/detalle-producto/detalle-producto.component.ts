import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
  standalone: false
})
export class DetalleProductoComponent {
  producto: Producto | null = null;
  cargando: boolean = true;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id || isNaN(id)) {
      this.error = true;
      this.cargando = false;
      return;
    }

    this.productoService.getProductoById(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

agregarAlCarrito(): void {
  if (this.producto) {
    this.carritoService.agregarProducto(this.producto);
    alert(`✅ ${this.producto.nombre} añadida al carrito.`);
  }
}


  volver(): void {
    this.router.navigate(['/tienda']);
  }
  getRutaImagen(imagen: string): string {
  if (imagen.startsWith('uploads/')) {
    return 'http://localhost/gonsa-futbol-api/' + imagen;
  }
  return imagen; // ya es assets/...
}

}
