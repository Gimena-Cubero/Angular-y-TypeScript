import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  //cosa para que muestre donde estuvo
  ultimaCategoria = signal(
    localStorage.getItem('ultimaCategoria') ?? ''
  );
}
