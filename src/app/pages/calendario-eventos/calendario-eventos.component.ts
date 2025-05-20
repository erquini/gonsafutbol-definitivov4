import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EventosService } from '../../services/eventos.service';
import { OpinionesService } from '../../services/opiniones.service'; // <-- Añadido

interface Team {
  id: number;
  name: string;
  crest?: string;
}
interface Competition {
  id: number;
  name: string;
  code: string;
}
interface Match {
  utcDate: string;
  matchday?: number;
  venue?: string;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
}
interface Suggestion {
  id: number;
  name: string;
  type: 'Equipo' | 'Competición';
  code?: string;
}

@Component({
  selector: 'app-calendario-eventos',
  templateUrl: './calendario-eventos.component.html',
  styleUrls: ['./calendario-eventos.component.css'],
  standalone: false
})
export class CalendarioEventosComponent implements OnInit {
  searchTerm: string = '';
  suggestions: Suggestion[] = [];
  matches: Match[] = [];
  errorMessage: string = '';

  allTeams: Team[] = [];
  allCompetitions: Competition[] = [];
  hasLoadedTeams = false;
  hasLoadedCompetitions = false;
  selectedCompetitionCode: string = '';

  opiniones: any[] = []; // <-- Reemplaza las fijas

  constructor(
    private eventosService: EventosService,
    private opinionesService: OpinionesService
  ) {}

  ngOnInit(): void {
    this.searchTerm = '';
    this.loadCompetitions();

    // ✅ Obtener opiniones aleatorias
    this.opinionesService.getOpiniones().subscribe((res: any) => {
      this.opiniones = this.obtenerAleatorias(res.opiniones, 3);
    });
  }

  obtenerAleatorias(lista: any[], cantidad: number): any[] {
    return [...lista].sort(() => Math.random() - 0.5).slice(0, cantidad);
  }

  loadCompetitions(): void {
    if (this.hasLoadedCompetitions) return;

    this.eventosService.getCompeticiones().subscribe({
      next: (data) => {
        this.allCompetitions = data.competitions.filter(
          (c: any) => c.plan === 'TIER_ONE' && !!c.code
        );
        this.hasLoadedCompetitions = true;
      },
      error: () => {
        this.errorMessage = '❌ Error al cargar competiciones.';
      }
    });
  }

  loadAllTeams(): void {
    if (this.hasLoadedTeams || !this.hasLoadedCompetitions) return;

    const peticiones = this.allCompetitions.slice(0, 3).map(comp =>
      this.eventosService.getEquiposPorCompeticion(comp.code)
    );

    this.errorMessage = '⏳ Cargando equipos...';

    forkJoin(peticiones).subscribe({
      next: (responses) => {
        responses.forEach(data => {
          for (let team of data.teams) {
            if (!this.allTeams.find(t => t.id === team.id)) {
              this.allTeams.push({ id: team.id, name: team.name, crest: team.crest });
            }
          }
        });
        this.hasLoadedTeams = true;
        this.errorMessage = '✅ Equipos cargados correctamente.';
      },
      error: () => {
        this.errorMessage = '❌ Error al cargar equipos.';
      }
    });
  }

  cargarEquiposDeUnaLiga(): void {
    if (!this.selectedCompetitionCode) {
      this.errorMessage = '⚠️ Debes seleccionar una competición.';
      return;
    }

    this.errorMessage = '⏳ Cargando equipos de la competición...';

    this.eventosService.getEquiposPorCompeticion(this.selectedCompetitionCode).subscribe({
      next: (data) => {
        data.teams.forEach((team: any) => {
          if (!this.allTeams.find(t => t.id === team.id)) {
            this.allTeams.push({ id: team.id, name: team.name, crest: team.crest });
          }
        });
        this.hasLoadedTeams = true;
        this.errorMessage = '✅ Equipos de la liga cargados.';
      },
      error: (err) => {
        this.errorMessage =
          err.status === 429
            ? '⚠️ Has hecho demasiadas peticiones. Espera un minuto.'
            : '❌ Error al cargar equipos de la competición.';
      }
    });
  }

  onSearchInput(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term.length < 2) {
      this.suggestions = [];
      return;
    }

    if (!this.hasLoadedCompetitions) {
      this.loadCompetitions();
      this.errorMessage = 'ℹ️ Cargando competiciones, intenta de nuevo en un momento.';
      return;
    }

    if (!this.hasLoadedTeams) {
      this.errorMessage = '⚠️ Primero carga los equipos manualmente o selecciona una liga.';
      return;
    }

    this.sugerir(term);
  }

  private sugerir(term: string): void {
    const teamSuggestions = this.allTeams
      .filter(team => team.name.toLowerCase().includes(term))
      .map(team => ({ id: team.id, name: team.name, type: 'Equipo' as const }));

    const competitionSuggestions = this.allCompetitions
      .filter(comp => comp.name.toLowerCase().includes(term))
      .map(comp => ({ id: comp.id, name: comp.name, type: 'Competición' as const, code: comp.code }));

    this.suggestions = [...competitionSuggestions, ...teamSuggestions].slice(0, 10);
  }

  onSearchSubmit(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return;

    const exactTeam = this.allTeams.find(t => t.name.toLowerCase() === term);
    const exactComp = this.allCompetitions.find(c => c.name.toLowerCase() === term);

    if (exactTeam) {
      this.fetchMatches({ id: exactTeam.id, name: exactTeam.name, type: 'Equipo' });
    } else if (exactComp) {
      this.fetchMatches({ id: exactComp.id, name: exactComp.name, type: 'Competición', code: exactComp.code });
    } else {
      this.errorMessage = '❌ No se encontró ningún equipo o competición con ese nombre.';
    }
  }

  selectSuggestion(suggestion: Suggestion): void {
    this.searchTerm = suggestion.name;
    this.suggestions = [];
    this.fetchMatches(suggestion);
  }

  private fetchMatches(suggestion: Suggestion): void {
    this.errorMessage = '';
    this.matches = [];

    if (suggestion.type === 'Equipo') {
      this.eventosService.getPartidosPorEquipo(suggestion.id).subscribe({
        next: (data) => this.matches = data.matches,
        error: (error) => {
          this.errorMessage = error.status === 429
            ? '⚠️ Has realizado muchas peticiones. Espera un minuto y vuelve a intentarlo.'
            : '❌ Error al cargar los partidos del equipo.';
        }
      });
    } else if (suggestion.type === 'Competición' && suggestion.code) {
      this.eventosService.getPartidosPorCompeticion(suggestion.code).subscribe({
        next: (data) => this.matches = data.matches,
        error: (error) => {
          this.errorMessage = error.status === 429
            ? '⚠️ Has realizado muchas peticiones. Espera un minuto y vuelve a intentarlo.'
            : '❌ Error al cargar los partidos de la competición.';
        }
      });
    }
  }
}
