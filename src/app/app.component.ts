import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BotoneraComponent } from './components/botonera/botonera.component';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BotoneraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular';

  serverService = inject(ServerService);
}
