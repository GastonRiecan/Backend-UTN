const fs = require('fs');

console.log("Leyendo el primer archivo...");

const text = fs.readFileSync('./archivo.txt', 'utf-8');

console.log("Primer texto leido: ", text);

console.log("----------> Hacer cosas mientras leo el primer archivo...");

console.log("Leyendo el segundo archivo...");

const secondtext = fs.readFileSync('./archivo2.txt', 'utf-8');

console.log("Segundo texto leido: ", secondtext);

//En este ejemplo se ver como la ejecucion del codigo es de manera secuencial, en orden.