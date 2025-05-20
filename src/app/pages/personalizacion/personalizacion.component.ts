import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';


@Component({
  selector: 'app-personalizacion',
  templateUrl: './personalizacion.component.html',
  styleUrls: ['./personalizacion.component.css'],
  standalone: false
})
export class PersonalizacionComponent implements AfterViewInit {
  @ViewChild('canvasTrasero', { static: false }) canvasTraseroRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasFrontal', { static: false }) canvasFrontalRef!: ElementRef<HTMLCanvasElement>;

  nombre: string = '';
  numero: string = '';
  color: string = 'blanca';
  parche: string = '';
  publicidad: string = 'PATROCINADOR';
  publicidadCentro: string = '';
  publicidadLateral: string = '';
  colorNombre: string = '#ffffff';
  colorNumero: string = '#FFD700';

  baseImage = new Image();
  
  constructor(private carritoService: CarritoService) {}


  ngAfterViewInit(): void {
    this.baseImage.src = 'assets/images/base-camiseta.png';
    this.baseImage.onload = () => this.dibujarCamisetas();
  }

  dibujarCamisetas(): void {
    this.dibujarTrasera();
    this.dibujarFrontal();
  }

  dibujarTrasera(): void {
    const canvas = this.canvasTraseroRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.baseImage, 0, 0, canvas.width, canvas.height);

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, this.obtenerColorHex(this.color));
    grad.addColorStop(1, '#ffffff');

    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    // Nombre
    ctx.font = '22px Bebas Neue, sans-serif';
    ctx.fillStyle = this.colorNombre;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText(this.nombre.toUpperCase(), canvas.width / 2, 140);
    ctx.shadowBlur = 0;

    // Número
    ctx.font = 'bold 44px Anton, sans-serif';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.strokeText(this.numero, canvas.width / 2, 190);
    ctx.fillStyle = this.colorNumero;
    ctx.fillText(this.numero, canvas.width / 2, 190);
  }

  dibujarFrontal(): void {
    const canvas = this.canvasFrontalRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.baseImage, 0, 0, canvas.width, canvas.height);

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, this.obtenerColorHex(this.color));
    grad.addColorStop(1, '#ffffff');

    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    // Parche (escudo)
    if (this.parche) {
      const parcheImg = new Image();
      parcheImg.src = `assets/images/${this.parche}.svg`;
      parcheImg.onload = () => {
        ctx.drawImage(parcheImg, canvas.width - 130, 110, 40, 40);

      };
    }

    // Publicidad central (imagen)
    if (this.publicidadCentro) {
      const pubCentroImg = new Image();
      pubCentroImg.src = `assets/images/${this.publicidadCentro}.svg`;
      pubCentroImg.onload = () => {
        ctx.drawImage(pubCentroImg, canvas.width / 2 - 50, 160, 100, 50);
      };
    }

    // Publicidad lateral (imagen)
    if (this.publicidadLateral) {
      const pubLateralImg = new Image();
      pubLateralImg.src = `assets/images/${this.publicidadLateral}.svg`;
      pubLateralImg.onload = () => {
        ctx.drawImage(pubLateralImg, 90, 110, 40, 40); 
      };
    }
  }

  actualizarVista(): void {
    this.dibujarCamisetas();
  }

agregarAlCarrito(): void {
  const productoPersonalizado: Producto = {
    id: Date.now(),
    nombre: `Camiseta personalizada ${this.nombre} #${this.numero}`,
    equipo: 'Personalizada',
    temporada: 'Actual',
    imagen: 'assets/images/base-camiseta.png', // o imagen generada desde canvas
    precio: 49.99,
    descripcion: `Color: ${this.color}, Escudo: ${this.parche}, Publicidad centro: ${this.publicidadCentro}, lateral: ${this.publicidadLateral}`,
    stock: 1
  };

  this.carritoService.agregarProducto(productoPersonalizado);
  alert(`🛒 Camiseta personalizada añadida al carrito: ${this.nombre} #${this.numero}`);
}


  obtenerColorHex(color: string): string {
    switch (color) {
      case 'roja': return '#dc3545';
      case 'azul': return '#007bff';
      case 'verde': return '#28a745';
      case 'blanca': return '#ffffff';
      default: return '#f8f9fa';
    }
  }
}
