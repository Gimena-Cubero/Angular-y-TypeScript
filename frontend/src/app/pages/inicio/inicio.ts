import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  //hace que el menseje dure 7 dias
  aceptarBienvenida() {
    document.cookie = 'bienvenida=aceptada; max-age=604800; path=/; SameSite=Lax';
    this.mostrarBienvenida.set(false);
  }

  //cosa para que muestre donde estuvo
  ultimaCategoria = signal(
    localStorage.getItem('ultimaCategoria') ?? ''
  );

  //galleta -- mensaje de bienbenida
  mostrarBienvenida = signal(
    !document.cookie.includes('bienvenida=aceptada')
    //document cookie consulta las cookies de la pagina
    //! = si la galleta no exte mostramos el mensaje
  );
}

