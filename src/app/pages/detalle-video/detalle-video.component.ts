import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideosService, Video } from '../../services/videos.service';

@Component({
  selector: 'app-detalle-video',
  templateUrl: './detalle-video.component.html',
  styleUrls: ['./detalle-video.component.css'],
  standalone:false
})
export class DetalleVideoComponent implements OnInit {
  video!: Video | undefined;

  constructor(
    private route: ActivatedRoute,
    private videosService: VideosService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.video = this.videosService.getVideoPorId(id);
  }

  sanitizarURL(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  volver(): void {
    this.router.navigate(['/videos']);
  }
}
