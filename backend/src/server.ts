// sera el punto de entrada del backend- se configurara el exprez
import express from 'express'; // lo queayuda con las conexiones
import cors from 'cors'; // ayuda ayuda a hacer al backen desde un navegador

const app = express(); // guarda el cafe en app

//
app.use(cors({ // configura cors para las solicitudes del express
  origin: 'http://localhost:4200'// a que autorizamos
}));

app.use(express.json()); //le entiende al json -- it's javascript

//ruta
app.get('/', (req, res) => { // informacion de la solitud resivida - enviar respuesta
    res.send('Bienvenido al backend de FungiVerse'); 
    // res send = puede ser lo que quiera ser , texto - html ...
})

//rUTA A LA API 
app.get('/api/estado', (req, res) => {
    res.json({ // envia respuest en json -- solo json
        //lo que recibe el cliente
        mensaje: 'API de fungiverse funcionanado',
        estado: 'activo'
    })
})


//configurar el puesto del servidor
const PORT = 3000; // establece el puerto

app.listen(PORT, () =>{ //incia el servidor y deja esperando solucitude en el puerto
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
})

//servidores 
// angular 4200 -- el usuario busca un hongo
// esxpress 3000 -- procesa la solicitud y devuelve la informacion

