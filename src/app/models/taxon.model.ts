//esta sera la interfase para manejar los datos de la api
export interface Taxon {
    
    id : number;
    name : string;
}

// segunda interfase
export interface RespuestaTaxones {
    results: Taxon[]; // lo que devuelve la api -- un array de objetos
}