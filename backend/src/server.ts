// sera el punto de entrada del backend- se configurara el exprez
import express from 'express'; // lo queayuda con las conexiones
import cors from 'cors'; // ayuda ayuda a hacer al backen desde un navegador

const app = express(); // guarda el cafe en app

//
app.use(cors({ // configura cors para las solicitudes del express
  origin: 'http://localhost:4200'// a que autorizamos
}));

app.use(express.json()); //le entiende al json -- it's javascript

//almacenaremos temporalmente los hongos
const favoritos: { taxonId: number; nota: string }[] = [];

//ruta
app.get('/', (req, res) => { // informacion de la solitud resivida - enviar respuesta
    res.send('Bienvenido al backend de FungiVerse'); 
    // res send = puede ser lo que quiera ser , texto - html ...
})


//todos amamamos estado 
//rUTA A LA API 
app.get('/api/estado', (req, res) => {
    res.json({ // envia respuest en json -- solo json
        //lo que recibe el cliente
        mensaje: 'API de fungiverse funcionanado',
        estado: 'activo'
    })
})

//ruta post
app.post('/api/favoritos', (req, res) => { // crea
  const favorito = req.body; // obtiene el json enviado por angular
  const existe = favoritos.some(guardado => guardado.taxonId === favorito.taxonId);
  
  if (existe) {
    return res.status(409).json({ // conflicto con el estado actual de recurso
    mensaje: 'Este hongo ya está en tus favoritos'
  });
}
  favoritos.push(favorito); // agrega un elemento al final

  console.log('Favorito recibido:', favorito);

  res.status(201).json({ // todo salio bien en la creacion
    mensaje: 'Favorito recibido correctamente',
    favorito: favorito
  });
});

//prueba para ver si se guarda en favoritos
//Invoke-RestMethod -Uri "http://localhost:3000/api/favoritos" -Method Post -ContentType "application/json" -Body '{"taxonId":48715,"nota":"Mi hongo favorito"}'

// ruta get para consultar favoritos
app.get('/api/favoritos', (req, res) => {
    res.json(favoritos); // devuelve el arreglo de favoritos como jso
});


//modificar el texto de un favorito
app.put('/api/favoritos/:taxonId', (req, res) => {
    const taxonId = Number(req.params.taxonId);
    //taxon id =  es el id que recide mediente la url 

    //Si encuentra una coincidencia, devuelve ese objeto.
    const favorito = favoritos.find(hongo => hongo.taxonId === taxonId);
    //facoritos fins = busca elemeneto dentro del arreglo
    //hongo taxonId === taxonId compara el ID del hongo con el ID recibido en la URL.

    if (!favorito) { //esta o no 
        // el return lo detien para que no lo siga intentando :(
        return res.status(404).json({ // que el recurso no existe
            mensaje: 'Favorito no encontrado'
    });
    }

    //modificar nota del favorito
    const { nota } = req.body;
    // comprobar que la nota es un texto y no vacio
    if (typeof nota !== 'string' || nota.trim() === '') {
        return res.status(400).json({ // datos invalidos
            mensaje: 'La nota debe contener texto'
        });
    }
    favorito.nota = nota;

    // cuando se actialize - cafe devuelve objeto modificado
    return res.status(200).json({ // 200 realizado correctamente
        mensaje: 'Favorito actualizado correctamente',
        favorito: favorito
    });

    // prueba put
    //Invoke-RestMethod -Uri "http://localhost:3000/api/favoritos/48715" -Method Put -ContentType "application/json" -Body '{"nota":"Me encanta su color rojo"}'

});


//ruta delete
app.delete('/api/favoritos/:taxonId', (req, res) => {
    const taxonId = Number(req.params.taxonId);
    // necesitamos encotrar su posicion para eliminarlos
    const indice = favoritos.findIndex(
        hongo => hongo.taxonId === taxonId
    );// si encuentra el favorito devuelve 1 -- si no existe -1

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Favorito no encontrado'
        });
    }

    favoritos.splice(indice, 1);// permite modificar y eliminar

    return res.status(200).json({// realizado correctamente
        mensaje: 'Favorito eliminado correctamente'
    });
});
//find - for of
//findIndex - for in


//configurar el puesto del servidor
const PORT = 3000; // establece el puerto

app.listen(PORT, () =>{ //incia el servidor y deja esperando solucitude en el puerto
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
})

//servidores 
// angular 4200 -- el usuario busca un hongo
// esxpress 3000 -- procesa la solicitud y devuelve la informacion

