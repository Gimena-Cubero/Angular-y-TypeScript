import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';//comunicacion con el express

@Injectable({
    providedIn: 'root'
})

export class Backend {
    //preparar httpClient dentro del servidor
    private http = inject(HttpClient); //angular nos proporciona una instancia http client


    // primer metodo get
    obtenerEstado() {
        //utiliza HttpClient para preparar una solicitud get
        return this.http.get('http://localhost:3000/api/estado'); //consultar la api estado existente en la api 3000
    }
}