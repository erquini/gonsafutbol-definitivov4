export interface Producto {
  id: number;
  nombre: string;
  equipo: string;
  temporada: string;
  imagen: string;
  precio: number;
  descripcion?: string;
  stock: number; 
}
