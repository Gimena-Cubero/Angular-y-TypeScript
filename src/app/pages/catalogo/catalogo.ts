import { Component, signal} from '@angular/core';
import { Hongos } from '../../services/hongos'; //servicio
import { Hongo } from '../../models/hongo.model'; // interface

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {

  hongos = signal<Hongo[]>([]);
  //la propiedad contendra un arreglo de objetos de tipo hongo
  cargando = signal(true);//señal que contiene un boleano, le dice a angular que actualize las partes de el 

  constructor (private hongosService:Hongos) {
    this.hongosService.obtenerHongos().subscribe({
      next: (datos) => {
        this.hongos.set(datos);
        console.log('Hongos del catalogo:', this.hongos())
        //cuando llegue la respuesta http, hongos dejara de estar vacio

        this.cargando.set(false);
        //set permite actualizar el valor de una señal
        console.log('Estado de carga en TypeScript:', this.cargando());
      },
      error: (error) => {
        console.error('Error al cargar el catalogo:', error);
        this.cargando.set(false); // esta dos veses porque sin importar el resultado este dice que ya termino
      }
    });

  }

  
}
