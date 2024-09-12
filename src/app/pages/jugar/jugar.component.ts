import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { CrearSalaArgs } from '../../interfaces/crearSala';
import { UsuarioService } from '../../services/usuario.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { DetallePartidaComponent } from '../../components/detalle-partida/detalle-partida.component';
import { SalaService } from '../../services/sala.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalFullscreenComponent } from '../../components/modal-fullscreen/modal-fullscreen.component';
import { EstadoJuego } from '../../interfaces/sala';
import { Location } from '@angular/common';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [
    RouterModule,
    TableroComponent,
    DetallePartidaComponent,
    ModalFullscreenComponent,
  ],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss',
})
export class JugarComponent implements OnInit {
  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);
  salaService = inject(SalaService);
  location = inject(Location);
  esPrivada = input();
  id = input<string>();
  estadosConModal: EstadoJuego[] = [
    'ABANDONADO',
    'EMPATE',
    'Esperando_oponente',
    'GANADOR_O1',
    'GANADOR_O2',
    'CAMPEON_O1',
    'CAMPEON_O2',
  ];
  mostrarModal = computed(() =>
    this.estadosConModal.includes(this.salaService.estado())
  );
  estadoAnterior = signal<EstadoJuego>('Esperando_oponente');
  cambiarEstadoAnterior = effect(() => {
    if (this.salaService.estado()) {
      setTimeout(
        () => this.estadoAnterior.set(this.salaService.estado()),
        1000
      ),
        { allowSignalWrites: true };
    }
  });

  linkCopiado = signal<boolean>(false);

  ngOnInit(): void {
    this.location.replaceState('jugar');
    if (!this.esPrivada() && !this.id()) {
      this.salaService.crearSala();
    } else if (this.id()) {
      console.log('intentando conectar', this.id());
      this.salaService.unirseASala(parseInt(this.id()!));
    } else {
      this.salaService.crearSala(true);
    }
  }

  nuevaPartida() {
    this.salaService.nuevaPartida();
  }

  copiarLink() {
    navigator.clipboard.writeText(
      'localhost:4200/jugar/' + this.salaService.id()
    );
    this.linkCopiado.set(true);
    setTimeout(() => this.linkCopiado.set(false), 2000);
  }
}
