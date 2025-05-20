import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import emailjs from '@emailjs/browser';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  standalone: false
})
export class PagoComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';
  codigoPostal: string = '';
  tarjeta: string = '';
  carritoTotal: number = 0;
  errores: string[] = [];
  carrito: Producto[] = [];

  private SERVICE_ID = 'service_b1uhp4e';
  private TEMPLATE_ID = 'template_vhbafs1';
  private PUBLIC_KEY = 'Z7tdjGnQrd5u8MVBr';

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();

    // Asegurarse de que los precios son números
    this.carrito.forEach(p => {
      p.precio = Number(p.precio);
    });

    this.carritoTotal = this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }

  procesarPago() {
    this.errores = [];

    if (this.nombre.trim().length < 3) {
      this.errores.push("⚠️ El nombre debe tener al menos 3 caracteres.");
    }

    if (!/\d{9}/.test(this.telefono)) {
      this.errores.push("⚠️ El teléfono debe tener 9 dígitos numéricos.");
    }

    if (!this.email.includes('@')) {
      this.errores.push("⚠️ El correo electrónico no es válido.");
    }

    if (this.direccion.trim().length < 5) {
      this.errores.push("⚠️ La dirección debe ser válida.");
    }

    if (!/\d{5}/.test(this.codigoPostal)) {
      this.errores.push("⚠️ El código postal debe tener 5 dígitos.");
    }

    if (!/\d{16}/.test(this.tarjeta)) {
      this.errores.push("⚠️ La tarjeta debe tener 16 dígitos numéricos.");
    }

    if (this.errores.length === 0) {
      const productosTexto = this.carrito.map(p => `- ${p.nombre} — ${Number(p.precio).toFixed(2)} €`).join('\n');
      const resumen = `
🛍️ Productos:\n
${productosTexto}

Total: ${Number(this.carritoTotal).toFixed(2)} €`;

      const templateParams = {
        to_email: this.email,
        nombre: this.nombre,
        direccion: this.direccion,
        tabla_productos: resumen
      };

      emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
        .then(() => {
          this.carritoService.vaciarCarrito();
          alert(`✅ Pago realizado con éxito. Se ha enviado un recibo a ${this.email}.`);
          this.router.navigate(['/confirmacion'], { state: { nombre: this.nombre } });
        })
        .catch(err => {
          console.error('Error al enviar email:', err);
          alert('❌ Error al enviar el recibo por correo.');
        });
    }
  }
}
