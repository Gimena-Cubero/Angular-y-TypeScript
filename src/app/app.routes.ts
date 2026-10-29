import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';// creacion de los catalogos de los hongos

export const routes: Routes = [
    {
        //creacion de la ruta para ver el catalogo de los hongos 
        path: 'catalogo', //direcion - texto
        component: Catalogo // que componente deve mostrar angular - clase en angular
    }
];
