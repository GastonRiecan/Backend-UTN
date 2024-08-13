"use strict";
let nombre = 'pepe';
nombre = null;
console.log(nombre);
let datoRandom = 'hola';
/* Cuando hay un ? el parametro es opcional */
const saludar = (nombre) => {
    if (nombre) {
        return "Hola " + nombre;
    }
    else {
        return "Hola, no se tu nombre.";
    }
};
saludar();
saludar("Gaston");
const persona = {
    nombre: "Gaston",
    apellido: "Riecan",
    edad: 37
};
/*

/*
calcularIva que recibe un numero y devuelve un numero que sera el 21% del numero recibido
obtenerImpuestoIva que recibira un numero y retornara un objeto, el objeto tendra el siguiente esquema:
{
    iva: 21% del numero recibido,
    total: numero recibido + iva,
    base: numero recibido
}
*/
const calcularIva = (numero) => {
    return numero * 0.21;
};
console.log(calcularIva(100));
const obtenerImpuestoIva = (numero) => {
    const iva = numero * 0.21;
    const total = numero + iva;
    return {
        iva,
        total,
        base: numero
    };
};
console.log(obtenerImpuestoIva(100));
const crearPersonaje = (nombre, edad, ciudadOrigen) => {
    return {
        nombre,
        edad,
        ciudadOrigen,
        vida: 100,
        armadura: 20,
        ataque: 80,
        defensa: 56
    };
};
console.log(crearPersonaje("pepe", 30, "BSAS"));
