import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor() {
    const nombreLocalStorage = localStorage.getItem('nombre');
    if (nombreLocalStorage) this.nombre.set(nombreLocalStorage);
  }

  nombre = signal<string>('');

  guardarNombreEnLocalStore = effect(() =>
    localStorage.setItem('nombre', this.nombre())
  );
}
