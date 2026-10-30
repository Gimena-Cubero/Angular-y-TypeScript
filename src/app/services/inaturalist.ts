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
    
}
