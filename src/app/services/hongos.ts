import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//En app.config.ts configuramos su proveedor mediante provideHttpClient().
import { Hongo } from '../models/hongo.model'; //Importar la interface

@Injectable({ // gestiona el servicio
    providedIn: 'root' // registra el servicio para usarlo en la aplicacion
})
export class Hongos {
    constructor(private http: HttpClient) { //inyecion de dependencias

    }

    //metodo
    obtenerHongos() {
        //get devuelve un observable
        //si esta direcion esta mal escrita saldra un error que majejamos en app.ts
        return this.http.get<Hongo[]>('/assets/hongos.json');
    }
}
