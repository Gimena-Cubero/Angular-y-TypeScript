// en este se guardaran las definiciones que haremos en la aplicacion 

//las interfases describen extructuras de los datos
//esta es la interfase que maneja los deatos de json
export interface Hongo {
    taxonId : number;
    categoria : string;
    descripcion : string;
    morfologia : string;
    destacado : boolean;
}