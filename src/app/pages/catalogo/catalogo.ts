import { Component, signal} from '@angular/core';
import { Hongos } from '../../services/hongos'; //servicio
import { Hongo } from '../../models/hongo.model'; // interface
import { Inaturalist } from '../../services/inaturalist';
import { Taxon } from '../../models/taxon.model';
import { ActivatedRoute } from '@angular/router'; //obtiene informacion de la ruta actual

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
  taxonSeleccionado = signal<Taxon | null>(null);
  taxones = signal<Taxon[]>([]);//para combinar la informacion de la api y  del json
  categoriaActual = signal('');
  
  buscarTaxon(taxonId : number): Taxon | undefined{
    //busca el primero que consida con el id del json si lo encuentra devuelve sino pos nada
    return this.taxones().find((taxon) => taxon.id === taxonId);
  }

  //esto es lo que usamos para dividir a catalogo en 3
  filtrarPorCategoria(categoria: string): Hongo[] {
  return this.hongos().filter( //todod los registros del json
    hongo => hongo.categoria === categoria // compara la categoria del registro con la que queremos mostrar
  );
}
  

  constructor (
    private hongosService: Hongos, 
    private inaturalistService: Inaturalist,
    private route: ActivatedRoute // esto funciona para que angular conosca la ruta que se quiere mostrar

  ) {
    //guarda el parametro de la direccion url y la guarda en el signal
    this.route.paramMap.subscribe(params =>{
      this.categoriaActual.set(params.get('categoria') ?? '');
      console.log('Categoría actual:', this.categoriaActual());
    });


    this.hongosService.obtenerHongos().subscribe({
      next: (datos) => {
        this.hongos.set(datos);

        const ids = datos.map((hongo) =>hongo.taxonId);
        console.log('IDs del catálogo:', ids)

        //ir conectando informacion de la api y el json
        this.inaturalistService.obtenerVariosTaxones(ids).subscribe({
          next: (respuesta) => {
            this.taxones.set(respuesta.results);
            console.log('Especies recibidas:', this.taxones().length);
          },
          error: (error) => {
            console.error('Error al consultar iNaturalist:', error);
          }
        });

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
        const taxon = respuesta.results[0]; //solo contiene un objeto de INaturalist
        console.log('ID del taxon:', taxon.id)
        console.log('Respuesta de iNaturalist:', respuesta);


        if (taxon) { //existe o no - si no existe aangular no lo leera
          this.taxonSeleccionado.set(taxon); //guarda el objeto completo
          console.log('Nombre científico:',taxon.name);
          console.log('Nombre común recibido:', taxon.preferred_common_name);
          
        }
      },
      error: (error) => {
        console.error('Error al consultar iNaturalist:', error);
      }
    });

    //la informamacion de los demas taxones
    // this.inaturalistService.obtenerVariosTaxones([48715, 55899]).subscribe({
    //   next: (respuesta) => {
    //     //respuesta.results usamos en lugar de respuesta porque esta estupido y no entiende que es un signal entonse lo tengo que escribir de esta forma para que se guarde
    //     this.taxones.set(respuesta.results);//contiene los objetos que se reciden de la api
    //     console.log('Taxones guardados:', this.taxones());

    //     //mostrar solo la informacion que queremos para evitar todo el textote
    //     // respuesta.results.forEach((taxon) => {
    //     //   console.log('ID:', taxon.id);
    //     //   console.log('Nombre científico:', taxon.name);
    //     //   console.log('Nombre común:', taxon.preferred_common_name);
    //     // });
    //   },
    //   error: (error) => {
    //     console.error('Error al consultar varios taxones:', error);
    //   }
    // });

    
    

  }

  
}
