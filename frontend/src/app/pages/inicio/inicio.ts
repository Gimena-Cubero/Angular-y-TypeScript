import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  constructor(){
    this.comprobarBackend(); // llama el metodo del fech
    this.comprobarBackendAsync();
  }


  //hace que el menseje dure 7 dias
  aceptarBienvenida() {
    document.cookie = 'bienvenida=aceptada; max-age=604800; path=/; SameSite=Lax';
    this.mostrarBienvenida.set(false);
  }

  //cosa para que muestre donde estuvo - json
  ultimaCategoria = signal(
    localStorage.getItem('ultimaCategoria') ?? ''
  );

  //galleta -- mensaje de bienbenida
  mostrarBienvenida = signal(
    !document.cookie.includes('bienvenida=aceptada')
    //document cookie consulta las cookies de la pagina
    //! = si la galleta no exte mostramos el mensaje
  );

  // si quiero probaR La bienvenida de nuevo en la consola del chrome
  //1.document.cookie = 'bienvenida=; max-age=0; path=/'
  //2.document.cookie

  //metodo - consulta el si el backen esta on -- estado
  comprobarBackend() {
    fetch('http://localhost:3000/api/estado') // realiza solicitud
      .then(respuesta => { // comprueba la respuesta 
        if (!respuesta.ok) {
          throw new Error('Error al consultar el backend');
        }
        return respuesta.json();
      })
      .then(datos => console.log('Estado del backend:', datos)) // bien on
      .catch(error => console.error('Backend no disponible:', error)); // mal 
  }

  //pues esta hace lo mismo   -- estado
  async comprobarBackendAsync() { //funciona de forma asincronica
    try {
      const respuesta = await fetch('http://localhost:3000/api/estado');
      //awai - espera el resultado de la promesa antes de continuar

      if (!respuesta.ok) {
        throw new Error('Error al consultar el backend');
      }

      const datos = await respuesta.json();
      console.log('Estado del backend con async/await:', datos);

    } catch (error) {
      console.error('Error con async/await:', error);
    }
  }

  
}

