import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];

  constructor() {
    //Recuperar carrito almacenado en `localStorage`
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  /** Obtener todos los productos del carrito */
  getCarrito(): Producto[] {
    return this.carrito;
  }

  /** Agregar producto al carrito y guardar en localStorage */
  agregarProducto(producto: Producto) {
    this.carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  eliminarProducto(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  vaciarCarrito() {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }
}
