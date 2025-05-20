import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Camiseta de Maldini 2006/2007',
      equipo: 'AC Milan',
      temporada: '2006/07',
      imagen: 'assets/images/camiesta-maldini.jpg',
      precio: 59.99,
      descripcion: 'Camiseta icónica de Maldini en la temporada 2006/07.',
      stock: 12
    },
    {
      id: 2,
      nombre: 'Camiseta de Maradona 1986',
      equipo: 'Argentina',
      temporada: '1986',
      imagen: 'assets/images/camiseta_maradadona_futbol.jpg',
      precio: 69.99,
      descripcion: 'Camiseta legendaria de Maradona en el Mundial de 1986.',
      stock: 5
    },
    {
      id: 3,
      nombre: 'Camiseta de Ronaldo 2002',
      equipo: 'Brasil',
      temporada: '2002',
      imagen: 'assets/images/camiseta-ronaldo.jpg',
      precio: 65.99,
      descripcion: 'Camiseta con la que Ronaldo llevó a Brasil a la victoria en 2002.',
      stock: 8
    },
    {
      id: 4,
      nombre: 'Camiseta de Messi 2010',
      equipo: 'Barcelona',
      temporada: '2010',
      imagen: 'assets/images/barcelona.jpg',
      precio: 74.99,
      descripcion: 'Camiseta de Messi en el Mundial de Sudáfrica 2010.',
      stock: 3
    },
    {
      id: 5,
      nombre: 'Camiseta de Zidane 1998',
      equipo: 'Francia',
      temporada: '1998',
      imagen: 'assets/images/zidane.jpg',
      precio: 79.99,
      descripcion: 'Camiseta de Zidane en la Copa del Mundo 1998.',
      stock: 10
    },
    {
      id: 6,
      nombre: 'Camiseta de Ronaldinho 2005',
      equipo: 'FC Barcelona',
      temporada: '2005/06',
      imagen: 'assets/images/barcelona.jpg',
      precio: 69.99,
      descripcion: 'Camiseta con la que Ronaldinho ganó el Balón de Oro en 2005.',
      stock: 7
    },
    {
      id: 7,
      nombre: 'Camiseta de Cristiano Ronaldo 2008',
      equipo: 'Manchester United',
      temporada: '2008',
      imagen: 'assets/images/camiseta-ronaldi.jpg',
      precio: 89.99,
      descripcion: 'Camiseta de Cristiano Ronaldo en su época dorada con el Manchester United.',
      stock: 4
    },
    {
      id: 8,
      nombre: 'Camiseta de Neymar 2013',
      equipo: 'FC Barcelona',
      temporada: '2013/14',
      imagen: 'assets/images/ney.jpg',
      precio: 79.99,
      descripcion: 'Camiseta de Neymar en su primera temporada con el FC Barcelona.',
      stock: 6
    },
    {
      id: 9,
      nombre: 'Camiseta de Pelé 1970',
      equipo: 'Brasil',
      temporada: '1970',
      imagen: 'assets/images/pele.jpg',
      precio: 120.00,
      descripcion: 'La famosa camiseta de Pelé en el Mundial de 1970, una de las más legendarias.',
      stock: 2
    },
    {
      id: 10,
      nombre: 'Camiseta de Beckham 2003',
      equipo: 'Manchester United',
      temporada: '2003',
      imagen: 'assets/images/beckam.jpg',
      precio: 85.99,
      descripcion: 'Camiseta de David Beckham durante su tiempo en el Manchester United.',
      stock: 9
    },
    {
      id: 11,
      nombre: 'Camiseta de Thierry Henry 2004',
      equipo: 'Francia',
      temporada: '2004',
      imagen: 'assets/images/henry.jpg',
      precio: 89.99,
      descripcion: 'Camiseta de Thierry Henry en su histórica temporada con el Arsenal.',
      stock: 5
    },
    {
      id: 12,
      nombre: 'Camiseta de Van Basten 1988',
      equipo: 'Holanda',
      temporada: '1988',
      imagen: 'assets/images/van-basten.jpg',
      precio: 79.99,
      descripcion: 'Camiseta de Marco Van Basten en la Eurocopa 1988.',
      stock: 6
    },
    {
      id: 13,
      nombre: 'Camiseta de Messi 2014',
      equipo: 'Barcelona',
      temporada: '2014',
      imagen: 'assets/images/messi-2014.jpg',
      precio: 74.99,
      descripcion: 'Camiseta de Messi durante el Mundial de Brasil 2014.',
      stock: 8
    },
    {
      id: 14,
      nombre: 'Camiseta de Ronaldo 2016',
      equipo: 'Real Madrid',
      temporada: '2016',
      imagen: 'assets/images/cris.jpg',
      precio: 89.99,
      descripcion: 'Camiseta de Cristiano Ronaldo en su triunfo con Portugal en la Euro 2016.',
      stock: 4
    },
    {
      id: 15,
      nombre: 'Camiseta Edición Limitada',
      equipo: 'Especial',
      temporada: '2023',
      imagen: 'assets/images/recomendacion1.jpg',
      precio: 39.99,
      descripcion: 'Una camiseta exclusiva en tirada limitada.',
      stock: 10
    },
    {
      id: 16,
      nombre: 'Camiseta Retro 90s',
      equipo: 'Vintage',
      temporada: '1990',
      imagen: 'assets/images/recomendacion2.jpg',
      precio: 29.99,
      descripcion: 'Estilo clásico de los años 90, ideal para nostálgicos.',
      stock: 15
  },
  {
      id: 17,
      nombre: 'Pack 3 Camisetas Personalizadas',
      equipo: 'Varios',
      temporada: 'Actual',
      imagen: 'assets/images/recomendacion3.jpg',
      precio: 59.99,
      descripcion: 'Pack especial con 3 camisetas totalmente personalizadas.',
      stock: 5
  }

  ];

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }
}
