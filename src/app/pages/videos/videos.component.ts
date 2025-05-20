import { Component, OnInit } from '@angular/core';
import { VideosService, Video } from '../../services/videos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  standalone: false
})

export class VideosComponent implements OnInit {
  gruposDeVideos: Video[][] = [];

  constructor(private videosService: VideosService, private router: Router) {}

  ngOnInit(): void {
    const videos = this.videosService.getVideos();
    const videosUnicos = this.eliminarDuplicados(videos);
    const tamanoGrupo = 5;

    for (let i = 0; i < videosUnicos.length; i += tamanoGrupo) {
      this.gruposDeVideos.push(videosUnicos.slice(i, i + tamanoGrupo));
    }
  }

  verDetalle(id: number): void {
    this.router.navigate(['/videos', id]);
  }

  private eliminarDuplicados(videos: Video[]): Video[] {
    const vistos = new Set();
    return videos.filter(video => {
      if (vistos.has(video.id)) {
        return false;
      } else {
        vistos.add(video.id);
        return true;
      }
    });
  }
}
