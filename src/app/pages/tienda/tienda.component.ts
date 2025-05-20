import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  standalone: false
})
export class TiendaComponent {
  // Productos
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];


  // Filtros
  filtroEquipo: string = '';
  filtroTemporada: string = '';
  filtroPrecio: number = 200;

  // Orden actual
  orden: string = 'precioAsc';

  // Opiniones para mostrar (para HTML extendido)
  opiniones = [
    { texto: 'La calidad es espectacular. Volveré a comprar.', autor: 'Carlos García' },
    { texto: 'Excelente servicio y envío rápido.', autor: 'Lucía Fernández' },
    { texto: 'La personalización quedó increíble. ¡Gracias!', autor: 'Pedro Ramírez' }
  ];

  // Galería
  imagenesGaleria = [
    'assets/images/galeria1.jpg',
    'assets/images/galeria2.jpg',
    'assets/images/galeria3.jpg',
    'assets/images/galeria4.jpg',
  ];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    // Obtener productos del servicio
    this.productos = this.productoService.getProductos();

    // Aplicar filtros por defecto (todos)
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    // Filtros combinados
    this.productosFiltrados = this.productos.filter(producto =>
      producto.equipo.toLowerCase().includes(this.filtroEquipo.toLowerCase()) &&
      producto.temporada.toLowerCase().includes(this.filtroTemporada.toLowerCase()) &&
      producto.precio <= this.filtroPrecio
    );

    // Ordenar después de filtrar
    this.ordenarProductos();
  }

  resetFiltros(): void {
    this.filtroEquipo = '';
    this.filtroTemporada = '';
    this.filtroPrecio = 200;
    this.aplicarFiltros();
  }

  ordenarProductos(): void {
    switch (this.orden) {
      case 'precioAsc':
        this.productosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precioDesc':
        this.productosFiltrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'nombre':
        this.productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }
  }
  email: string = '';
mensaje: string = '';
mensajeExito: string = '';
mensajeError: string = '';

private SERVICE_ID = 'service_302z81o';
private TEMPLATE_ID = 'template_wcx3jeu';
private PUBLIC_KEY = 'pWvKxZdYaipY6srTM';

suscribirse(event?: Event) {
  event?.preventDefault();
  this.mensajeExito = '';
  this.mensajeError = '';

  if (!this.email || !this.email.includes('@')) {
    this.mensajeError = '⚠️ Por favor, introduce un correo válido.';
    return;
  }

  const templateParams = {
    to_email: this.email,
    message: `¡Gracias por suscribirte a GonsaFútbol! Pronto recibirás nuestras novedades.`
  };

  emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
    .then(() => {
      this.mensajeExito = '✅ ¡Suscripción exitosa! Revisa tu bandeja de entrada.';
      this.email = '';
    })
    .catch(() => {
      this.mensajeError = '❌ Error al enviar el correo. Inténtalo más tarde.';
    });
}
}
