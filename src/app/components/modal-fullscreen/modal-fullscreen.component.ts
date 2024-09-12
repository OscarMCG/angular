import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-modal-fullscreen',
  standalone: true,
  imports: [],
  templateUrl: './modal-fullscreen.component.html',
  styleUrl: './modal-fullscreen.component.scss',
  animations: [
    trigger('animateChildren', [
      transition('* => void', [
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('2s ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ translate: '400px' }),
        animate('0.5s ease-in-out', style({ translate: 0 })),
      ]),
      transition(':leave', [
        style({ translate: 0 }),
        animate('2s ease-out', style({ translate: '-400px' })),
      ]),
    ]),
    trigger('inOutAnimation2', [
      transition(':enter', [
        style({ translate: '400px' }),
        animate('0.5s 0.2s ease-in-out', style({ translate: 0 })),
      ]),
      transition(':leave', [
        style({ translate: 0 }),
        animate('2s 0.2s ease-out', style({ translate: '-400px' })),
      ]),
    ]),
  ],
})
export class ModalFullscreenComponent {
  mostrar = input.required<boolean>();
}
