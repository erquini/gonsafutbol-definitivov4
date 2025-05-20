import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FutbolistasService, Futbolista } from '../../services/futbolistas.service';

@Component({
  selector: 'app-futbolistas-historicos',
  templateUrl: './futbolistas-historicos.component.html',
  styleUrls: ['./futbolistas-historicos.component.css'],
  standalone: false,
})
export class FutbolistasHistoricosComponent {
  futbolistas: Futbolista[] = [];

  constructor(private futbolistasService: FutbolistasService, private router: Router) {
    this.futbolistas = this.futbolistasService.getFutbolistas();
  }

  verDetalle(id: number): void {
    this.router.navigate(['/futbolista', id]);
  }
}