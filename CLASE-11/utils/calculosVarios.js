/* Crear una funcion que reciba un precio y retorne un objeto con

recibe 100
{
    iva: 21,
    precio_original: 100,
    precio_final: 121
}

*/

const sumar = (num1, num2) => {
    return num1 + num2
}

console.log(sumar(10, 20));

//Common.js

const calculoIVA = (precio) => {
    const iva = precio * 0.21
    precio_final =  precio + iva
        
    return {
        iva,
        precio,
        precio_final
    }
}

const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;   
    return regex.test(email);
}

const validarNumero = (num) => {
    return typeof num === 'number' && !isNaN(num);
}

const validarNombre = (nombre) => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/;
    return typeof nombre === 'string' && regex.test(nombre) && nombre.trim().length > 0;
}



module.exports  = {
    validarEmail, 
    validarNumero,
    validarNombre,
    sumar
}

