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
  },
  {
  id: 18,
  nombre: 'Camiseta de Iniesta 2010',
  equipo: 'España',
  temporada: '2010',
  imagen: 'assets/images/iniesta.jpg',
  precio: 84.99,
  descripcion: 'Camiseta con la que Iniesta marcó el gol de la final del Mundial 2010.',
  stock: 7
  },
  {
  id: 19,
  nombre: 'Camiseta de Buffon 2006',
  equipo: 'Italia',
  temporada: '2006',
  imagen: 'assets/images/buffon.jpg',
  precio: 69.99,
  descripcion: 'Camiseta del mítico portero italiano en el Mundial de Alemania 2006.',
  stock: 4
  },
  {
  id: 20,
  nombre: 'Camiseta de Rooney 2004',
  equipo: 'Inglaterra',
  temporada: '2004',
  imagen: 'assets/images/rooney.jpg',
  precio: 74.99,
  descripcion: 'Camiseta de Wayne Rooney en la Euro 2004 con Inglaterra.',
  stock: 6
},
{
  id: 21,
  nombre: 'Camiseta de Xavi 2008',
  equipo: 'España',
  temporada: '2008',
  imagen: 'assets/images/xavi.jpg',
  precio: 79.99,
  descripcion: 'Camiseta de Xavi en la Eurocopa 2008 ganada por España.',
  stock: 5
},
{
  id: 22,
  nombre: 'Camiseta de Drogba 2007',
  equipo: 'Chelsea',
  temporada: '2007',
  imagen: 'assets/images/drogba.jpg',
  precio: 69.99,
  descripcion: 'Camiseta clásica de Didier Drogba durante su etapa en el Chelsea.',
  stock: 8
},
{
  id: 23,
  nombre: 'Camiseta de Kaká 2007',
  equipo: 'AC Milan',
  temporada: '2007',
  imagen: 'assets/images/kaka.jpg',
  precio: 79.99,
  descripcion: 'Camiseta del año en que Kaká ganó el Balón de Oro con el Milan.',
  stock: 4
},
{
  id: 24,
  nombre: 'Camiseta de Del Piero 2002',
  equipo: 'Juventus',
  temporada: '2002',
  imagen: 'assets/images/delpiero.jpg',
  precio: 69.99,
  descripcion: 'Camiseta retro de Del Piero en sus mejores años en la Juventus.',
  stock: 5
},
{
  id: 25,
  nombre: 'Camiseta de Robben 2014',
  equipo: 'Holanda',
  temporada: '2014',
  imagen: 'assets/images/robben.jpg',
  precio: 74.99,
  descripcion: 'Camiseta de Robben durante el Mundial de Brasil 2014.',
  stock: 6
},
{
  id: 26,
  nombre: 'Camiseta de Griezmann 2018',
  equipo: 'Francia',
  temporada: '2018',
  imagen: 'assets/images/griezmann.jpg',
  precio: 84.99,
  descripcion: 'Camiseta del Mundial 2018 ganada por Francia.',
  stock: 5
},
{
  id: 27,
  nombre: 'Camiseta de Lewandowski 2020',
  equipo: 'Polonia',
  temporada: '2020',
  imagen: 'assets/images/lewandowski.jpg',
  precio: 69.99,
  descripcion: 'Camiseta de uno de los delanteros más letales del mundo.',
  stock: 7
},
{
  id: 28,
  nombre: 'Camiseta de Totti 2006',
  equipo: 'Italia',
  temporada: '2006',
  imagen: 'assets/images/totti.jpg',
  precio: 79.99,
  descripcion: 'Camiseta de Francesco Totti durante el Mundial de Alemania.',
  stock: 3
},
{
  id: 29,
  nombre: 'Camiseta de Benzema 2022',
  equipo: 'Real Madrid',
  temporada: '2022',
  imagen: 'assets/images/benzema.jpg',
  precio: 89.99,
  descripcion: 'Camiseta con la que Benzema brilló en la Champions 2022.',
  stock: 9
},
{
  id: 30,
  nombre: 'Camiseta de Modric 2018',
  equipo: 'Croacia',
  temporada: '2018',
  imagen: 'assets/images/modric.jpg',
  precio: 89.99,
  descripcion: 'Camiseta de Modric cuando lideró a Croacia a la final del Mundial.',
  stock: 6
},
{
  id: 31,
  nombre: 'Camiseta de Haaland 2023',
  equipo: 'Manchester City',
  temporada: '2023',
  imagen: 'assets/images/haaland.jpg',
  precio: 94.99,
  descripcion: 'Camiseta de Erling Haaland tras su temporada goleadora histórica en el City.',
  stock: 7
},
{
  id: 32,
  nombre: 'Camiseta de Bellingham 2024',
  equipo: 'Real Madrid',
  temporada: '2024',
  imagen: 'assets/images/bellingham.jpg',
  precio: 89.99,
  descripcion: 'Camiseta de la revelación inglesa en su primera gran temporada con el Madrid.',
  stock: 6
}


  

  ];

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }
}
