//esta sera la interfase para manejar los datos de la api
export interface Taxon {
    id : number;
    name : string;
    preferred_common_name? : string;//algunas pordrian no tener
    taxon_photos? : TaxonFoto[];
    default_photo? : Foto;

    
    
}

// segunda interfase
export interface RespuestaTaxones {
    results: Taxon[]; // lo que devuelve la api -- un array de objetos
    //taxon describe la especie completa
}


// estas son dos porque se representan 2 objetos 
// tercera esta es para las fotos 
export interface Foto {
    medium_url? : string;
}

// cuarta
export interface TaxonFoto { //TaxonFoto contiene la propiedad photo, que a su vez tiene la estructura de Foto.
    photo : Foto; 
    //foto datos de la fotografia
    //taxon foto su contenido es un objeto foto
}