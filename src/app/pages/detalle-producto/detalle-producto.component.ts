import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';  // Importamos el servicio para manejar el carrito

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  standalone: false,
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  producto: Producto | undefined;  // Variable para almacenar el producto

  constructor(
    private route: ActivatedRoute,  // Para obtener parámetros de la URL
    private router: Router,  // Para navegar entre páginas
    private productoService: ProductoService,  // Servicio que obtiene productos
    private carritoService: CarritoService  // Servicio para gestionar el carrito
  ) {}

  ngOnInit() {
    // Obtenemos el id del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Buscamos el producto por su id
    this.producto = this.productoService.getProductoById(id);
  }

  // Función para añadir el producto al carrito
  agregarAlCarrito() {
    if (this.producto) {
      this.carritoService.agregarProducto(this.producto);
      alert(`✅ ${this.producto.nombre} añadida al carrito.`);  // Notificación al usuario
    }
  }

  // Función para volver a la página de la tienda
  volver() {
    this.router.navigate(['/tienda']);
  }
}
