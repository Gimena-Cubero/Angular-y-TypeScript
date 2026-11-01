import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';// creacion de los catalogos de los hongos
import { Inicio } from './pages/inicio/inicio';
import { Explorar } from './pages/explorar/explorar';
import { DetalleHongo } from './pages/detalle-hongo/detalle-hongo';
import { Favoritos } from './pages/favoritos/favoritos';

export const routes: Routes = [
    {
        path : '',
        component : Inicio
    },
    {
        path : 'explorar',
        component : Explorar
    },
    {
        //creacion de la ruta para ver el catalogo de los hongos 
        path: 'catalogo/:categoria', //direcion - texto
        ///:categoria - esto lo combiere en parametro - recibe diferentes valores en esta pocicion
        component: Catalogo // que componente deve mostrar angular - clase en angular
    },
    {
       path: 'hongo/:taxonId', // parametro dinamico
       component: DetalleHongo 
    },
    {
        path: 'favoritos',
        component: Favoritos
    }
    
];
