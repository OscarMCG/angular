import { Component, computed, inject } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { NumeroJugador, PosicionTablero } from '../../interfaces/sala';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.scss',
})
export class TableroComponent {
  salaService = inject(SalaService);
  esMiTurno = computed(
    () =>
      (this.salaService.estado() === 'Turno_O1' &&
        this.salaService.numeroDeJugador() === 1) ||
      (this.salaService.estado() === 'Turno_O2' &&
        this.salaService.numeroDeJugador() === 2)
  );

  jugar(posicion: PosicionTablero) {
    this.salaService.jugar(posicion);
    //Enviar al back el estado
  }

  getMarca(jugador: '' | NumeroJugador) {
    if (!jugador) return '';
    if (jugador === 1) return 'X';
    return 'O';
  }
}
