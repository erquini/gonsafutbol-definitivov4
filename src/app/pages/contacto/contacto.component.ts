import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  standalone: false,
})
export class ContactoComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  asunto: string = '';
  mensaje: string = '';
  errorMensaje: string = '';
  enviado: boolean = false;
  aceptaPolitica: boolean = false;


  enviarMensaje() {
  if (!this.nombre || !this.email || !this.telefono || !this.mensaje) {
    this.errorMensaje = '⚠️ Todos los campos son obligatorios.';
    return;
  }

  if (!this.validarEmail(this.email)) {
    this.errorMensaje = '⚠️ Ingresa un email válido.';
    return;
  }

  if (!this.validarTelefono(this.telefono)) {
    this.errorMensaje = '⚠️ Ingresa un número de teléfono válido (solo números, mínimo 9 dígitos).';
    return;
  }

  if (!this.aceptaPolitica) {
    this.errorMensaje = '⚠️ Debes aceptar la política de privacidad antes de enviar el mensaje.';
    return;
  }

  const templateParams = {
    from_name: this.nombre,
    from_email: this.email,
    telefono: this.telefono,
    asunto: this.asunto,
    message: this.mensaje,
  };

  emailjs
    .send(
      'service_302z81o',
      'template_havxonk',
      templateParams,
      'pWvKxZdYaipY6srTM'
    )
    .then(
      (response) => {
        console.log('✅ CORREO ENVIADO', response);
        this.enviado = true;
        this.errorMensaje = '';
        this.limpiarFormulario();
      },
      (error) => {
        console.error('❌ ERROR al enviar', error);
        this.errorMensaje = 'Hubo un error al enviar el mensaje. Intenta de nuevo más tarde.';
      }
    );
}


  limpiarFormulario() {
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.asunto = '';
    this.mensaje = '';
      this.aceptaPolitica = false;

  }

  validarEmail(email: string): boolean {
    const re = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  validarTelefono(telefono: string): boolean {
    const re = /^[0-9]{9,15}$/;
    return re.test(telefono);
  }
}
