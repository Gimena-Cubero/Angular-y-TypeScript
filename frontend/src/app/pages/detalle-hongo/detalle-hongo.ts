import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inaturalist } from '../../services/inaturalist';
import { Taxon } from '../../models/taxon.model';
import { Observacion } from '../../models/observacion.model';
import { Backend } from '../../services/backend'; // para el favorito

@Component({
  imports: [],
  selector: 'app-detalle-hongo',
  styleUrl: './detalle-hongo.css',
  templateUrl: './detalle-hongo.html',
})
export class DetalleHongo {
  taxonId = 0;
  taxon = signal<Taxon | null>(null); // despues la guardaremos un objeto taxon
  cargando = signal(true);
  errorCarga = signal(false);
  observaciones = signal<Observacion[]>([]); //guarda lo que llega de i naturalist
  cargandoObservaciones = signal(true); // srguimos esperando ?
  errorObservaciones = signal(false); // llamen a Dios, salen 300 errores
  favoritos = signal<{ taxonId: number; nota: string }[]>([]); // para guardar los favoritos

  // cuando alguien quiera entrar en /hongo/5456
  constructor(
    private route: ActivatedRoute,
    private inaturalistService: Inaturalist,
    private backendService: Backend
  ) {
  this.route.paramMap.subscribe(params => {
    this.taxonId = Number(params.get('taxonId')); //obtiene el valor

    this.observaciones.set([]); // limpiae
    this.cargandoObservaciones.set(true);
    this.errorObservaciones.set(false);

    this.inaturalistService.obtenerObservaciones(this.taxonId).subscribe({ //le enviamos el id de la que estaamos viendo
      next: (respuesta) => {
        this.observaciones.set(respuesta.results);
        this.cargandoObservaciones.set(false);

        console.log('Observaciones encontradas:', respuesta.results.length);
      },
      error: (error) => {
        console.error('Error al obtener observaciones:', error);
        this.errorObservaciones.set(true);
        this.cargandoObservaciones.set(false);
      }
    });
    //----------------------------------------------------------------------------------


    console.log('ID del hongo seleccionado:', this.taxonId);

    this.cargando.set(true);
    this.errorCarga.set(false);
    this.taxon.set(null);

    this.inaturalistService.obtenerTaxon(this.taxonId).subscribe({
      next: (respuesta) => {
        this.taxon.set(respuesta.results[0] ?? null); //guarda el primero sino guarda null
        this.cargando.set(false);

        console.log('Detalle del hongo:', this.taxon());
      },
      error: (error) => {
        console.error('Error al obtener el hongo:', error);
        this.errorCarga.set(true);
        this.cargando.set(false);
      }
    });
  });
  }

  //apregar la obcion de agregar a faboritos
  agregarAFavoritos() { //metodo boton
    this.backendService.agregarFavorito(
      this.taxonId, //el id del hongo que se esta viendo 
      'Mi hongo favorito'
    ).subscribe({ // ejecuta el post y recibe la respuesta del express
      next: (respuesta) => {
        console.log('Favorito agregado:', respuesta);
        alert('Hongo agregado a favoritos correctamente');
      },
      error: (error) => {
        //si quieren guarda 2 veses el mismo ongo sal el mensaje
        if (error.status === 409) { // no se completo la solicitud
          alert('Este hongo ya está en tus favoritos');
        } else {
          console.error('Error al agregar favorito:', error);
        }
      }
    });
  }

  //ver los favoritos
  verFavoritos() {
  this.backendService.obtenerFavoritos().subscribe({
    next: (respuesta) => {
      //guardamos el arreglo dentro de la signal
      this.favoritos.set(respuesta as { taxonId: number; nota: string }[]);
      console.log('Mis hongos favoritos:', this.favoritos());
    },
    error: (error) => {
      console.error('Error al obtener favoritos:', error);
    }
  });
}
}
