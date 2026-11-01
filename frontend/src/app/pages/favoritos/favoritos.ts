import { Component, inject, signal } from '@angular/core';
import { Backend } from '../../services/backend';
import { Inaturalist } from '../../services/inaturalist';
import type { FavoritoDetalle } from '../../models/favorito';
import { HongoFavorito } from '../../models/hongo-favorito.model'; // la clase que me invente para cumplir con la rubrica

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
  notaEditada = signal(''); // editar las notitas
  favoritoEnEdicion = signal<number | null>(null); // para saber cual estamos cambiando

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


  //editar las notas de favoritos
  editarNota(favorito: FavoritoDetalle) {
    this.favoritoEnEdicion.set(favorito.taxonId); // nota que queremos editar
    this.notaEditada.set(favorito.nota); // la que usan par editar
  }

  //guardar las notas ya editadas
  guardarNota(taxonId: number) {
    const favoritoActualizado = new HongoFavorito(taxonId, '');// pues la clase que nos inventamos por la rubrica
    favoritoActualizado.actualizarNota(this.notaEditada());

    //para que no este vacio 
    if (!favoritoActualizado.nota) {
      alert('Por favor, escribe una nota antes de guardar.');
      return;
    }

    this.backendService.actualizarFavorito(
      taxonId,
      //antes era este = this.notaEditada() -- esta si podia guardar espacios porque no tenia el trim
      favoritoActualizado.nota // obtiene el txto nuevo
    ).subscribe({ // espera la respuesta
      next: () => {
        console.log('Nota actualizada correctamente');
        this.favoritosDetalle.update(actuales => // modifica los actuales
          actuales.map(favorito =>
            favorito.taxonId === taxonId // identifica el hongo que acabamos de editar
              ? { ...favorito, nota: favoritoActualizado.nota }
              : favorito //deja los demas hongos sin cambios
          )
        );
        this.favoritoEnEdicion.set(null); // cuando se guarda se sierra ek boton
      },
      error: error => {
        console.error('Error al actualizar la nota:', error);
      }
    });
  }

}
