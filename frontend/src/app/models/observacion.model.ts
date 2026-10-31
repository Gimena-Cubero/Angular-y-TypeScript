// muestra mas informacion en las trajetas cuando se les da ver mas
export interface Observacion {
  id: number;
  observed_on?: string; // fecha de observacion
  place_guess?: string; //lugar 
  photos?: {
    url: string;
  }[];
}

export interface RespuestaObservaciones {
  results: Observacion[];
  total_results: number; // cantidad de las observaciones encontradas
}