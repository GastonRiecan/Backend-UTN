console.dir("Hello World desde NODE.JS");
//const calculoIVA = require('./utils/calculosVarios')

//const { calculoIVA } = require('./utils/calculosVarios')

//const precioVaso = 20

//console.log(calculoIVA(precioVaso));

//const { validarEmail, validarNumero, validarNombre } = require('./utils/calculosVarios.js')

//const { crearTxt, leerTxt, crearJSON, leerJSON } = require("./utils/sistemaArchivos.js")

const { sumar } = require("./utils/calculosVarios.js")

console.log(sumar(10, 20) + "Hola");

//console.log(leerJSON("persona-1"));
//crearTxt()
//leerTxt()
/* const persona = {
    nombre: "Gaston",
    email: "gaston@gmail",
    dni: 123
}

crearJSON("persona-1", persona) */

/* console.log(validarEmail("gaston@gmail.com"));
console.log(validarNumero(123));
console.log(validarNombre("gaston")) */;


/* 
Modulos: 

-utils/validaciones.js
    -validarEmail
    -validarNumero
    -validarNombre

Probar las funciones en index.js

Ejemplo: 

let email_recibido = "pepe@pepe"
console.log(validarEmail(email_recibido)) deberia devolver false
*/

