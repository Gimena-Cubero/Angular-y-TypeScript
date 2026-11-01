import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hongos } from './services/hongos';
import { Backend } from './services/backend';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Angula_TypeScript');
  
  //preparamaos a app para que pueda usar el servicio de 
  private backendService = inject(Backend);

  //COMPROBAR QUE PUEDE LEER los json
  //tambien se considera inyecion de dependencias un componente puede usar un servicio
  constructor(private hongosService: Hongos){ //nos proporciona nuestro servicio de hongos
    this.hongosService.obtenerHongos().subscribe ({ 
      //subscribe permite recibir datos cuando llegue la respuesta

      //manejar si este falla
      next: (datos) => { //datos recibe el arreglo de hongos
        console.log('Hongos recibidos:', datos);
      },
      error: (error) =>{
        console.error('Error all obtener los hongos:', error);
      }
    });
    
    //llamar al metodo obtnerEstado
    this.backendService.obtenerEstado().subscribe({ //metodo get que creamos en el servicio
      //subscribe = inicia a la solicitud http y recibe resultado
      next: (respuesta) => {
        console.log('Respuesta del backend:', respuesta);
      },
      error: (error) => {
        console.error('Error al conectar con el backend:', error);
      }
    });

  }

  

  
}
