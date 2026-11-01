# FungiVerse 🍄
FungiVerse es una aplicación web desarrollada con Angular, TypeScript, Node.js y Express que permite explorar especies de hongos utilizando la API de iNaturalist.

La aplicación incluye un catálogo de hongos seleccionados, un buscador de especies, páginas con información detallada y una sección de favoritos donde se pueden agregar, consultar, editar notas y eliminar hongos.


## Tecnologías utilizadas
- **Angular 22:** desarrollo de la interfaz y navegación entre páginas.
- **TypeScript:** lógica de la aplicación, interfaces, clases y tipado.
- **Node.js:** ejecución del servidor backend.
- **Express:** creación de los endpoints para gestionar favoritos.
- **iNaturalist API:** consulta de especies, fotografías y observaciones de hongos.
- **JSON local:** almacenamiento de 10 hongos seleccionados para el catálogo.
- **HTML y CSS:** estructura y diseño adaptable de la aplicación.
- **Git y GitHub:** control de versiones del proyecto.


## Funcionalidades
- **Inicio:** presentación de FungiVerse y acceso a las diferentes secciones.
- **Catálogo:** muestra 23 especies seleccionadas, organizadas en las categorías Coloridos, Luminosos y Extraordinarios.
- **Explorar:** permite buscar especies de hongos mediante la API de iNaturalist.
- **Detalle del hongo:** muestra información de la especie y sus observaciones.
- **Favoritos:** permite agregar, consultar y eliminar hongos favoritos.
- **Notas personales:** permite editar y guardar una nota para cada favorito.
- **Manejo de errores:** muestra mensajes cuando no hay resultados o falla una solicitud.
- **Preferencias:** recuerda la última categoría visitada mediante localStorage y utiliza una cookie para gestionar el mensaje de bienvenida.

## Instrucciones de ejecución
**Requisitos previos:**
- Tener instalados Node.js y npm.
- Tener descargado el proyecto.

### 1. Iniciar el backend
Abrir una terminal en la carpeta `backend` y ejecutar:
```bash
npm install
npm run dev
``
El backend debe ejecutarse en `http://localhost:3000`.

### 2. Iniciar el frontend
Abrir otra terminal en la carpeta `frontend` y ejecutar:
```bash
npm install
ng serve
```
Abrir `http://localhost:4200` en el navegador.
**Importante:** ambos servidores deben permanecer encendidos para utilizar correctamente la aplicación y gestionar los favoritos.

**Nota:** `npm install` instala las dependencias necesarias y normalmente solo debe ejecutarse al preparar el proyecto por primera vez o cuando cambien las dependencias.
Ambos servidores deben permanecer encendidos para utilizar las funcionalidades de FungiVerse.


## Almacenamiento de datos
FungiVerse utiliza diferentes mecanismos para gestionar la información:
- **JSON local:** el archivo `public/assets/hongos.json` contiene 23 especies seleccionadas, organizadas en las categorías Coloridos, Luminosos y Extraordinarios.
- **API de iNaturalist:** proporciona información sobre las especies, sus fotografías y observaciones.
- **Backend Node.js:** administra los hongos favoritos y sus notas mediante operaciones CRUD. Los datos se almacenan temporalmente en memoria, por lo que se pierden al reiniciar el servidor.
- **localStorage:** guarda la última categoría visitada para permitir que el usuario continúe explorando desde la página de inicio.
- **Cookie:** almacena la preferencia de haber cerrado el mensaje de bienvenida. Tiene una duración de siete días y puede eliminarse desde las herramientas de almacenamiento del navegador.


## Manejo de errores
FungiVerse incluye validaciones y mensajes para informar al usuario cuando ocurre algún problema.
- **Error de conexión con el backend:** se muestra un mensaje cuando no es posible consultar los favoritos.
- **Error de iNaturalist:** se informa cuando no se pueden cargar las especies o sus detalles.
- **Búsquedas sin resultados:** se muestra un mensaje indicando que no se encontraron especies.
- **Favoritos vacíos:** se informa cuando el usuario todavía no tiene hongos favoritos.
- **Notas vacías:** se impide guardar una nota que solo contenga espacios en blanco.
- **Favoritos duplicados:** el backend responde con un error HTTP 409 cuando se intenta agregar un favorito existente.
- **Errores al editar o eliminar:** se muestra un mensaje si la operación no puede completarse.
