import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FutbolistasService, Futbolista } from '../../services/futbolistas.service';

@Component({
  selector: 'app-futbolista-detalle',
  templateUrl: './futbolista-detalle.component.html',
  styleUrls: ['./futbolista-detalle.component.css'],
  standalone: false
})
export class FutbolistaDetalleComponent implements OnInit {
  futbolista!: Futbolista;

  constructor(private route: ActivatedRoute, private futbolistasService: FutbolistasService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const encontrado = this.futbolistasService.getFutbolistaPorId(id);
    if (encontrado) this.futbolista = encontrado;
  }
}
