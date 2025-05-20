import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';
import { OpinionesService } from '../../services/opiniones.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  standalone: false
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  filtroEquipo: string = '';
  filtroTemporada: string = '';
  filtroPrecio: number = 200;
  orden: string = 'precioAsc';

  opiniones: any[] = [];
  imagenesGaleria = [
    'assets/images/galeria1.jpg',
    'assets/images/galeria2.jpg',
    'assets/images/galeria3.jpg',
    'assets/images/galeria4.jpg',
  ];

  email: string = '';
  mensaje: string = '';
  mensajeExito: string = '';
  mensajeError: string = '';

  private SERVICE_ID = 'service_302z81o';
  private TEMPLATE_ID = 'template_wcx3jeu';
  private PUBLIC_KEY = 'pWvKxZdYaipY6srTM';

  constructor(
    private productoService: ProductoService,
    private opinionesService: OpinionesService
  ) {}

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
    this.aplicarFiltros();

    this.opinionesService.getOpiniones().subscribe((res: any) => {
      this.opiniones = this.obtenerAleatorias(res.opiniones, 3);
    });
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.equipo.toLowerCase().includes(this.filtroEquipo.toLowerCase()) &&
      producto.temporada.toLowerCase().includes(this.filtroTemporada.toLowerCase()) &&
      producto.precio <= this.filtroPrecio
    );
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

  obtenerAleatorias(lista: any[], cantidad: number): any[] {
    return [...lista].sort(() => Math.random() - 0.5).slice(0, cantidad);
  }

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
