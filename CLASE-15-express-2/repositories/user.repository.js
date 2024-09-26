//Los archivos repository son los que tendran la responsabilidad de interactuar con los datos
//EJEMPLOS:
//getProductById 

import { leerJson, crearJson } from "../helpers/jsonManager.util.js"

/* 
Ventajas de repository:

Poner una capa logica sobre la obtencion de datos separada de la logica de negocio
Si el dia de mañana por X motivo nos cambian la base de datos, entonces solo debemos modificar la capa logica repository

*/

const getUserByName = async (name) => {
    try {
        const usuarios = await leerJson('usuarios')
        const usuarioBuscado = usuarios.find(usuario => usuario.nombre === name)
        return usuarioBuscado
    }
    catch (error) {
        console.error(error)
    }
}

const data = {
    "nombre": "Gaston",
    "apellido": "Riecan",
    "edad": 37
}

const newUser = crearJson('usuarios', data)





export { getUserByName }