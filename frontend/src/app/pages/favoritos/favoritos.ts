import { Component, inject, signal } from '@angular/core';
import { Backend } from '../../services/backend';
import { Inaturalist } from '../../services/inaturalist';
import type { FavoritoDetalle } from '../../models/favorito';

@Component({
  imports: [],
  selector: 'app-favoritos',
  styleUrl: './favoritos.css',
  templateUrl: './favoritos.html',
})
export class Favoritos {
  private backendService = inject(Backend);
  private inaturalistService = inject(Inaturalist);
  favoritos = signal<{ taxonId: number; nota: string }[]>([]);
  favoritosDetalle = signal<FavoritoDetalle[]>([]); // guarda informacion combinada el id la nota y el objeto

  constructor() {
    this.backendService.obtenerFavoritos().subscribe({ //recibe respuesta
      next: (respuesta) => {
        this.favoritos.set(
          respuesta as { taxonId: number; nota: string }[]
        );
        this.favoritosDetalle.set([]);// vacia el arreglo de tarjetas antes de volver a cargar la informacion

        console.log('Favoritos recibidos:', this.favoritos());
        this.favoritos().forEach(favorito => {// lo obtiene del backend
          this.inaturalistService.obtenerTaxon(favorito.taxonId).subscribe({
            next: respuestaTaxon => {
              console.log('Información del hongo:', respuestaTaxon.results[0]);
              const taxon = respuestaTaxon.results[0];
              if (taxon) {
                this.favoritosDetalle.update(actuales => [
                  ...actuales,
                  {
                    taxonId: favorito.taxonId,
                    nota: favorito.nota,
                    taxon: taxon
                  }
                ]);
                console.log('Favoritos completos:', this.favoritosDetalle());
              }
            },
            error: error => {
              console.error('Error al obtener el hongo:', error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Error al obtener favoritos:', error);
      }
    });
  }

  // eliminar Favoritos
  eliminarFavorito(taxonId: number) { // recibe el identificador del hongo que queremos
    this.backendService.eliminarFavorito(taxonId).subscribe({
      next: () => {
        console.log('Favorito eliminado correctamente');
        this.favoritosDetalle.update(actuales =>
          actuales.filter(favorito => favorito.taxonId !== taxonId)
        );
      },
      error: error => {
        console.error('Error al eliminar favorito:', error);
      }
    });
  }

}
