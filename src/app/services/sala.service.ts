import { inject, Injectable, signal } from '@angular/core';
import {
  EstadoJuego,
  PosicionTablero,
  posicionGanadora,
  SalaBackend,
  Tablero,
} from '../interfaces/sala';
import { Jugador } from '../interfaces/jugador';
import { ServerService } from './server.service';
import { CrearSalaArgs } from '../interfaces/crearSala';
import { UnirseASalaCrearSalaArgs } from '../interfaces/uniseASala';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  constructor() {
    this.serverService.actualizacionDeSala$.subscribe((sala) => {
      this.desestructurarSala(sala);
    });
  }
  juador1 = signal<Jugador>({
    nombre: '',
    vidas: 0,
  });
  juador2 = signal<Jugador>({
    nombre: '',
    vidas: 0,
  });
  estado = signal<EstadoJuego>('Esperando_oponente');
  numeroDeJugador = signal<1 | 2 | undefined>(undefined);
  id = signal<number | undefined>(undefined);
  tablero = signal<Tablero>(['', '', '', '', '', '', '', '', '']);
  publica = signal<boolean | undefined>(undefined);
  posicionGanadora = signal<posicionGanadora | undefined>(undefined);

  desestructurarSala(salaBack: SalaBackend) {
    if (!salaBack) this.router.navigate(['/']);
    this.id.set(salaBack.id);
    this.estado.set(salaBack.estado);
    this.juador1.set(salaBack.jugadores[0]);
    this.juador2.set(salaBack.jugadores[1]);
    this.tablero.set(salaBack.tablero);
    this.publica.set(salaBack.publica);
    if (salaBack.posicionGanadora)
      this.posicionGanadora.set(salaBack.posicionGanadora);
  }

  /**crea una sala para jugar con otro participante */
  crearSala(esPrivada: boolean = false) {
    const args: CrearSalaArgs = {
      publica: !esPrivada,
      nombreJugador: this.usuarioService.nombre(),
    };

    this.serverService.server.emitWithAck('crearSala', args).then((res) => {
      //console.log('crear sala', res);
      this.desestructurarSala(res.sala);
      this.numeroDeJugador.set(1);
    });
  }
  /** une al participante a una sala  */
  unirseASala(id: number) {
    const args: UnirseASalaCrearSalaArgs = {
      id,
      nombreJugador: this.usuarioService.nombre(),
    };
    this.serverService.server.emitWithAck('unirseASala', args).then((res) => {
      //console.log('resultado de union', res);
      this.desestructurarSala(res.sala);
      this.numeroDeJugador.set(2);
    });
  }
  /** envia la informacion al servidor de la peticion del jugador para realizar una jugada */
  jugar(posicion: PosicionTablero) {
    //console.log('jugando');
    this.serverService.server.emit('jugar', {
      salaId: this.id(),
      jugador: this.numeroDeJugador(),
      posicion,
    });
  }
  /**peticion de continuar con la siguinete partida */
  nuevaPartida() {
    this.serverService.server.emit('nuevaPartida', { salaId: this.id() });
  }
}
