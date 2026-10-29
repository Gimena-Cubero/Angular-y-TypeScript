import { Component } from '@angular/core';
import { Hongos } from '../../services/hongos'; //servicio
import { Hongo } from '../../models/hongo.model'; // interface

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {

  hongos : Hongo[] = [];
  //la propiedad contendra un arreglo de objetos de tipo hongo

  constructor (private hongosService:Hongos) {
    this.hongosService.obtenerHongos().subscribe({
      next: (datos) => {
        this.hongos = datos;
        console.log('Hongos del catalogo:', this.hongos)
        //cuando llegue la respuesta http, hongos dejara de estar vacio
      },
      error: (error) => {
        console.error('Error al cargar el catalogo:', error);
      }
    });

  }

  
}
