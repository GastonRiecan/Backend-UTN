let nombre: string | null = "pepe";
nombre = null;
console.log(nombre);

let datoRandom: any = "hola";

/* Cuando hay un ? el parametro es opcional */
const saludar = (nombre?: string) => {
  if (nombre) {
    return "Hola " + nombre;
  } else {
    return "Hola, no se tu nombre.";
  }
};

saludar();
saludar("Gaston");

interface Persona {
  nombre: String;
  apellido: String;
  edad: Number;
}

const persona: Persona = {
  nombre: "Gaston",
  apellido: "Riecan",
  edad: 37,
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

const calcularIva = (numero: number): number => {
  return numero * 0.21;
};

console.log(calcularIva(100));

interface Impuesto {
  iva: number;
  total: number;
  base: number;
}

const obtenerImpuestoIva = (numero: number): Impuesto => {
  const iva = numero * 0.21;
  const total = numero + iva;
  return {
    iva,
    total,
    base: numero,
  };
};

console.log(obtenerImpuestoIva(100));

/* 
crear una funcion que se llame crearPersonaje que recibira un nombre, una edad y una ciudad de origen y retornara
un objeto con el sig esquema:
{
    nombre: nombre,
    edad: edad,
    ciudadOrigen: ciudadOrigen,
    vida: 100,
    armadura: 0,
    ataque: 0,
    defensa: 0
}
*/

interface Personaje {
  nombre: string;
  edad: number;
  ciudadOrigen: string;
  vida: number;
  armadura: number;
  ataque: number;
  defensa: number;
}

const crearPersonaje = (
  nombre: string,
  edad: number,
  ciudadOrigen: string
): Personaje => {
  return {
    nombre,
    edad,
    ciudadOrigen,
    vida: 100,
    armadura: 20,
    ataque: 80,
    defensa: 56,
  };
};
console.log(crearPersonaje("pepe", 30, "BSAS"));
