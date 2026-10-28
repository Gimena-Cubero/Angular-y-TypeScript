import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//En app.config.ts configuramos su proveedor mediante provideHttpClient().

@Injectable({ // gestiona el servicio
    providedIn: 'root' // registra el servicio para usarlo en la aplicacion
})
export class Hongos {
    constructor(private http: HttpClient) { //inyecion de dependencias

    }
}
