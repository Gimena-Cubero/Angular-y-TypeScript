import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'; //permite hacer la solicitud http
import { RespuestaTaxones } from '../models/taxon.model'; //interface de la api

@Injectable({
    providedIn: 'root'//dice que esta disponible para todas, palabras mas palabras menos
})
export class Inaturalist {
    constructor (private http: HttpClient) {
        
    }
    obtenerTaxon(taxonId: number){
        //esta sera una consulta especifica para que estos coincidan con los datos del json
        const url = `https://api.inaturalist.org/v1/taxa/${taxonId}`;
        //realiza una solicitud get, devuelve un observable para que pueda suscribirse y obtener los datos
        return this.http.get<RespuestaTaxones>(url); // le dice al ts que se prepare para la api pues 
    }

    //metodo
    obtenerVariosTaxones(ids: number[]){
        //join hace que se unan con los ids
        const URL = `https://api.inaturalist.org/v1/taxa/${ids.join(',')}`;
        return this.http.get<RespuestaTaxones>(URL)
    }
    
    //la mera papaya el que se conecta con la api y muestra los datos sin el json
    explorarHongos(pagina: number = 1) { //numero de pagina
        const URL = `https://api.inaturalist.org/v1/taxa?taxon_id=47170&rank=species&per_page=30&page=${pagina}`;
        return this.http.get<RespuestaTaxones>(URL);
    }

    //buscar hongos
    buscarHongos(nombre : string, pagina : number = 1){
        //nombre -lo que escriba el usuario
        //pagiga - permite que vermas funcione en la busqueda
        const URL = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(nombre.trim())}&taxon_id=47170&rank=species&per_page=30&page=${pagina}`;
        return this.http.get<RespuestaTaxones>(URL);
    }

}
