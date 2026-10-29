import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hongos } from './services/hongos';


@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Angula_TypeScript');

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

  }
  
}
