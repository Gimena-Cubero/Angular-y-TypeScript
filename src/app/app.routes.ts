import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';// creacion de los catalogos de los hongos

export const routes: Routes = [
    {
        //creacion de la ruta para ver el catalogo de los hongos 
        path: 'catalogo/:categoria', //direcion - texto
        ///:categoria - esto lo combiere en parametro - recibe diferentes valores en esta pocicion
        component: Catalogo // que componente deve mostrar angular - clase en angular
    }
];
