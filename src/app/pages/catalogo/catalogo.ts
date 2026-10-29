import { Component, signal} from '@angular/core';
import { Hongos } from '../../services/hongos'; //servicio
import { Hongo } from '../../models/hongo.model'; // interface
import { Inaturalist } from '../../services/inaturalist';

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {

  hongos = signal<Hongo[]>([]); //el arreglo de hongos recibido del servicio
  //la propiedad contendra un arreglo de objetos de tipo hongo
  cargando = signal(true);//señal que contiene un boleano, le dice a angular que actualize las partes de el 
  errorCarga = signal(false); // indicara si ocurrio un error al cargar los hongos
  

  constructor (
    private hongosService:Hongos, 
    private inaturalistService: Inaturalist
  ) {
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
        this.errorCarga.set(true);
        this.cargando.set(false); // esta dos veses porque sin importar el resultado este dice que ya termino
      }
    });

    // esto lo que hace es para ver si esta leyendo la api o no
    this.inaturalistService.obtenerTaxon(48715).subscribe({
      next: (respuesta) => {
        //obtiene los datos de la api
        const taxon = respuesta.results[0];
        console.log('ID del taxon:', taxon.id)
        console.log('Nombre científico:',taxon.name);
        console.log('Respuesta de iNaturalist:', respuesta);
      },
      error: (error) => {
        console.error('Error al consultar iNaturalist:', error);
      }
    });

  }

  
}
