import { Component, signal, Signal } from '@angular/core';
import { Inaturalist } from '../../services/inaturalist';
import { Taxon } from '../../models/taxon.model';

@Component({
  imports: [],
  selector: 'app-explorar',
  styleUrl: './explorar.css',
  templateUrl: './explorar.html',
})
export class Explorar {
  taxones = signal<Taxon[]>([]); //la interfaz - arreglo - el arreglo comienza vacio
  cargando = signal(true);
  errorCarga = signal(false);
  paginaActual = signal(1);
  cargandoMas = signal(false); //por si algun pendejo clickea 400 veses ver mas que este no muera en el intento

  //constructor para consultar los hongos
  constructor(private inaturalistService: Inaturalist){
    this.inaturalistService.explorarHongos().subscribe({
      next: (respuesta) =>{
        //set = refresh
        this.taxones.set(respuesta.results); //es el arreglo de especies que está dentro de ese objeto.
        //guarda en taxones lo que llega de inaturalist
        this.cargando.set(false);
        console.log('Hongos encontrados:', respuesta.results.length); //.length nos dice cuántos elementos tiene ese arreglo
        console.log('Primer taxón completo:', respuesta.results[0]);
      },
      error: (error) => {
        console.error('Error al explorar hongos:', error);
        this.errorCarga.set(true);
        this.cargando.set(false);
      }
    });
  }

  //ver mas 
  cargarMasHongos() {
    if (this.cargandoMas()) return;
    this.cargandoMas.set(true); // cargando mas....

    const siguientePagina = this.paginaActual() + 1;

    this.inaturalistService.explorarHongos(siguientePagina).subscribe({
      next: (respuesta) => {
        this.taxones.update(actuales => [ // conserva los actuales y ingresa los nuevos
          ...actuales,
          ...respuesta.results
        ]);

        this.paginaActual.set(siguientePagina);
        this.cargandoMas.set(false); // ver mas hongos
        console.log('Total de hongos:', this.taxones().length);
      },
      error: (error) => {
        console.error('Error al cargar más hongos:', error);
      }
    });
  }
}
