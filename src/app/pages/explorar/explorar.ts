import { Component, signal, Signal } from '@angular/core';
import { Inaturalist } from '../../services/inaturalist';
import { Taxon } from '../../models/taxon.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
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
  terminoBusqueda = signal(''); //si ubicas a...
  busquedaActiva = signal(''); //pa que pase lñas prubas de qa - si se toca ver mas y se buscan otras se mescolan resultados

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

  //que se pueda ingresar texto en el campo de la busqueda
  actualizarBusqueda(evento: Event) {
    const input = evento.target as HTMLInputElement; //le dice que van entrar datos que nos de permiso de aceder a value
    this.terminoBusqueda.set(input.value);
  }

  //ver mas 
  cargarMasHongos() {
    if (this.cargandoMas()) return;
    this.cargandoMas.set(true); // cargando mas....

    const siguientePagina = this.paginaActual() + 1;

      const nombre = this.busquedaActiva();

      const peticion = nombre // otra vaca
        ? this.inaturalistService.buscarHongos(nombre, siguientePagina) // se esta vacio - nombre y pagina
        // ? = si hay nombre para buscar
        : this.inaturalistService.explorarHongos(siguientePagina);// si no solo la pagina

      peticion.subscribe({
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

  //crear el metododo buscar
  buscar() {
    const nombre = this.terminoBusqueda().trim();//obtiene nombre

    if (!nombre){// pues tiene sque estar lleno si no pues no funciona
      return;
    }

    this.cargando.set(true); 
    this.errorCarga.set(false);
    this.busquedaActiva.set(nombre);

    //volvemos a preguntarle a la api
    this.inaturalistService.buscarHongos(nombre).subscribe({
      next: (respuesta) => { //los remplazan por otros :(
        this.taxones.set(respuesta.results);
        this.paginaActual.set(1);// se reinicia porque nuevo año nuevo yo
        this.cargando.set(false);

        console.log('Resultado de busqueda:', respuesta.results.length)
      },
      error: (error) => {
        console.error('Error al buscar hongos:', error);
        this.errorCarga.set(true);
        this.cargando.set(false);
      }
    })
  }

  //limpiar busqueda lo que fue fue
  limpiarBusqueda() {
    //limpiamos
    this.terminoBusqueda.set('');
    this.busquedaActiva.set('');
    //reinicia
    this.paginaActual.set(1);
    this.cargando.set(true);
    this.errorCarga.set(false);

    this.inaturalistService.explorarHongos().subscribe({
      next: (respuesta) => {
        this.taxones.set(respuesta.results);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al limpiar la búsqueda:', error);
        this.errorCarga.set(true);
        this.cargando.set(false);
      }
    });
  }
}
