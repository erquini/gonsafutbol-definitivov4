import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
  // Lista de categorías mostradas en el home
  categorias = [
    { nombre: 'Selecciones', imagen: 'assets/images/selecciones.png' },
    { nombre: 'Clubes', imagen: 'assets/images/clubes.png' },
    { nombre: 'Históricas', imagen: 'assets/images/historicas.png' },
    { nombre: 'Personalizadas', imagen: 'assets/images/personalizadas.png' }
  ];
  


  // Productos destacados
  productosPopulares = [
    {
      id: 3,
      nombre: 'Camiseta Brasil 2002',
      equipo: 'Brasil',
      temporada: '2002',
      imagen: 'assets/images/camiseta-ronaldo.jpg',
      precio: 65.99
    },
    {
      id: 2,
      nombre: 'Camiseta Maradona 1986',
      equipo: 'Argentina',
      temporada: '1986',
      imagen: 'assets/images/camiseta_maradadona_futbol.jpg',
      precio: 74.99
    },
    {
      id: 5,
      nombre: 'Camiseta Francia 1998',
      equipo: 'Francia',
      temporada: '1998',
      imagen: 'assets/images/zidane.jpg',
      precio: 79.99
    }
  ];

  // Opiniones de clientes
  opiniones = [
    { texto: '¡La camiseta llegó perfecta y muy rápido!', autor: 'Carlos García' },
    { texto: 'Excelente calidad y diseño. Muy recomendada.', autor: 'Lucía Fernández' },
    { texto: 'Me encantó la opción de personalizar. ¡10/10!', autor: 'Pedro Ramírez' }
  ];

  // Galería de imágenes
  imagenesGaleria = [
    'assets/images/galeria1.jpg',
    'assets/images/galeria2.jpg',
    'assets/images/galeria3.jpg',
    'assets/images/galeria4.jpg'
  ];

  // Campo del email y mensajes para la suscripción
  email: string = '';
  mensaje: string = '';
  mensajeExito: string = '';
  mensajeError: string = '';

  private SERVICE_ID = 'service_302z81o';
  private TEMPLATE_ID = 'template_wcx3jeu';
  private PUBLIC_KEY = 'pWvKxZdYaipY6srTM';

  // Enviar suscripción por email
 suscribirse(event?: Event) {
  event?.preventDefault();      
    this.mensaje = '';

    if (!this.email || !this.email.includes('@')) {
      this.mensaje = '⚠️ Por favor, introduce un correo válido.';
      return;
    }

    const templateParams = {
      to_email: this.email,
      message: `¡Gracias por suscribirte a GonsaFútbol! Pronto recibirás nuestras novedades.`
    };

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
      .then(() => {
        this.mensaje = '✅ ¡Suscripción exitosa! Revisa tu bandeja de entrada.';
        this.email = '';
      })
      .catch(() => {
        this.mensaje = '❌ Error al enviar el correo. Inténtalo más tarde.';
      });
  }
}
