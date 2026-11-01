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


    //post- envia datos, construye json y prepata el post para enviar el cafe
    agregarFavorito(taxonId: number, nota: string) {
        return this.http.post('http://localhost:3000/api/favoritos', {
            //tenemos que saber cual queremos guardar
            taxonId,
            nota
        });
    }


    //get deja que angular consulte los favoritos que obtiene en el express
    obtenerFavoritos() {
        return this.http.get('http://localhost:3000/api/favoritos');
        // pues para que idecar si los queremos todos
    }

    //modificar los favoritos
    actualizarFavorito(taxonId: number, nota: string) {
        return this.http.put(
            `http://localhost:3000/api/favoritos/${taxonId}`,
            { nota }
        );
    }

    //elimininar favorito - angular solicita al cafe eliminar el favorito
    eliminarFavorito(taxonId: number) { //lo eliminamos por id
    return this.http.delete(
        `http://localhost:3000/api/favoritos/${taxonId}`
    );
}
}