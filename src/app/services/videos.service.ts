import { Injectable } from '@angular/core';

export interface Video {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  imagen: string;
  categoria: string;

}

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private videos: Video[] = [
    {
      id: 1,
      titulo: 'Van Basten: Gol de volea Euro 88',
      descripcion: 'El gol legendario de Van Basten en la final de la Eurocopa 1988.',
      url: 'https://www.youtube.com/embed/fwAoWzasUUA',
      imagen: 'assets/images/futbolistas/vanbasten.jpg',
      categoria: 'Goles inolvidables'
    },
    {
      id: 2,
      titulo: 'Messi: Gol Maradoniano al Getafe',
      descripcion: 'Messi emulando a Maradona con una jugada histórica en 2007.',
      url: 'https://www.youtube.com/embed/i8TBwuN2zj4',
      imagen: 'assets/images/futbolistas/messi.jpg',
      categoria: 'Estrellas modernas'
    },
    {
      id: 3,
      titulo: 'Cristiano Ronaldo: Hat-trick ante España',
      descripcion: 'Cristiano brillando con Portugal en el Mundial 2018.',
      url: 'https://www.youtube.com/embed/cx3B-9ZPN6s',
      imagen: 'assets/images/futbolistas/cr7.jpg',
      categoria: 'Estrellas modernas'
    },
    {
      id: 4,
      titulo: 'Maradona: Gol del Siglo vs Inglaterra',
      descripcion: 'El gol más icónico de Diego en México 86.',
      url: 'https://www.youtube.com/embed/1wVho3I0NtU',
      imagen: 'assets/images/futbolistas/maradona.jpg',
      categoria: 'Momentos históricos'
    },
    {
      id: 5,
      titulo: 'Ronaldinho: Gol al Chelsea en Champions',
      descripcion: 'El mítico gol sin correr con una finta de otro planeta.',
      url: 'https://www.youtube.com/embed/Sv5g7pAnTPI',
      imagen: 'assets/images/futbolistas/ronaldinho.jpg',
      categoria: 'Leyendas del fútbol'
    },
    {
      id: 6,
      titulo: 'Zidane: Gol de volea en final Champions',
      descripcion: 'Zidane y su obra maestra con el Real Madrid en 2002.',
      url: 'https://www.youtube.com/embed/I-a-uIQhSBU',
      imagen: 'assets/images/futbolistas/zidane.jpg',
      categoria: 'Momentos históricos'
    },
    {
      id: 7,
      titulo: 'Iniesta: Gol en la final del Mundial 2010',
      descripcion: 'El gol que dio el título a España ante Países Bajos.',
      url: 'https://www.youtube.com/embed/6-EqlQMPmDI',
      imagen: 'assets/images/futbolistas/iniesta.jpg',
      categoria: 'Momentos históricos'
    },
    {
      id: 8,
      titulo: 'Ibrahimović: Gol de chilena desde 30m',
      descripcion: 'Una de las chilenas más espectaculares de la historia.',
      url: 'https://www.youtube.com/embed/RM_5tJncHww',
      imagen: 'assets/images/futbolistas/ibra.jpg',
      categoria: 'Goles inolvidables'
    },
    {
      id: 9,
      titulo: 'Kaká: Exhibición en Old Trafford',
      descripcion: 'Kaká brillando con el Milan en 2007.',
      url: 'https://www.youtube.com/embed/jT-pmM-Tls0',
      imagen: 'assets/images/futbolistas/kaka.jpg',
      categoria: 'Estrellas modernas'
    },
    {
      id: 10,
      titulo: 'Neymar: Hat-trick con el Santos',
      descripcion: 'El talento brasileño mostrando su magia en casa.',
      url: 'https://www.youtube.com/embed/_8izcPOKEG8',
      imagen: 'assets/images/futbolistas/ney.jpg',
      categoria: 'Estrellas modernas'
    },
    {
      id: 11,
      titulo: 'Lewandowski: 5 goles en 9 minutos',
      descripcion: 'Una hazaña imposible con el Bayern Múnich.',
      url: 'https://www.youtube.com/embed/TthnLjCrMTg',
      imagen: 'assets/images/futbolistas/lewa.jpg',
      categoria: 'Momentos históricos'
    },
    {
      id: 12,
      titulo: 'Baggio: La maldita final de USA 94',
      descripcion: 'El drama de Roberto Baggio y su penalti fallado.',
      url: 'https://www.youtube.com/embed/7EzZaaggUDg',
      imagen: 'assets/images/futbolistas/baggio.jpg',
      categoria: 'Momentos históricos'
    },
    {
      id: 13,
      titulo: 'Ronaldo Nazário: Exhibición ante Compostela',
      descripcion: 'Una de las mejores jugadas individuales del Fenómeno.',
      url: 'https://www.youtube.com/embed/MaIf6B4rH-A',
      imagen: 'assets/images/futbolistas/naza.jpg',
      categoria: 'Leyendas del fútbol'
    },
    {
      id: 14,
      titulo: 'Modrić: Balón de Oro 2018',
      descripcion: 'El camino del croata hasta conquistar el Balón de Oro.',
      url: 'https://www.youtube.com/embed/jFicjAqDm9A',
      imagen: 'assets/images/futbolistas/modric.jpg',
      categoria: 'Estrellas modernas'
    },
    {
      id: 15,
      titulo: 'Henry: Golazo al Manchester United',
      descripcion: 'Gol icónico de volea girando en el aire.',
      url: 'https://www.youtube.com/embed/8iBMW1wThlU',
      imagen: 'assets/images/futbolistas/titi.jpg',
      categoria: 'Goles inolvidables'
    },
    {
      id: 16,
      titulo: 'Xavi: Maestro del pase en acción',
      descripcion: 'Xavi Hernández en una clase magistral de control del juego.',
      url: 'https://www.youtube.com/embed/GU-oDNwzeEQ',
      imagen: 'assets/images/futbolistas/xavi.jpg',
      categoria: 'Leyendas del fútbol'
    },
    {
      id: 17,
      titulo: 'Mbappé: Exhibición contra Argentina 2018',
      descripcion: 'Mbappé demostrando por qué es el futuro del fútbol.',
      url: 'https://www.youtube.com/embed/w-HI15H3whA',
      imagen: 'assets/images/futbolistas/mba.jpg',
      categoria: 'Estrellas modernas'
    },
    {
      id: 18,
      titulo: 'Totti: Último partido con la Roma',
      descripcion: 'Un adiós emocional al capitán eterno.',
      url: 'https://www.youtube.com/embed/2RbrvSJ7P0U',
      imagen: 'assets/images/futbolistas/totti.jpg',
      categoria: 'Leyendas del fútbol'
    },
    {
      id: 19,
      titulo: 'Hazard: Exhibición ante el Arsenal',
      descripcion: 'El belga dejando defensas en el suelo.',
      url: 'https://www.youtube.com/embed/ho6wImex0kA',
      imagen: 'assets/images/futbolistas/hazard.jpg',
      categoria: 'Estrellas modernas'
    },
    {
      id: 20,
      titulo: 'Raúl: Su icónico gol al Barça',
      descripcion: 'Raúl silenciando el Camp Nou con clase.',
      url: 'https://www.youtube.com/embed/u89GQyptX30',
      imagen: 'assets/images/futbolistas/raul.jpg',
      categoria: 'Leyendas del fútbol'
    }
  ];

  getVideos() {
    return this.videos;
  }

  getVideoPorId(id: number) {
    return this.videos.find(video => video.id === id);
  }

  getVideosPorCategoria(): { categoria: string, videos: Video[] }[] {
    const categorias = [...new Set(this.videos.map(v => v.categoria))];
    return categorias.map(cat => ({
      categoria: cat,
      videos: this.videos.filter(v => v.categoria === cat)
    }));
  }
}
