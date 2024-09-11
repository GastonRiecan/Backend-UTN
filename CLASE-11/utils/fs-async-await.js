
const { readFile } = require('fs/promises');

async function init() {
    console.log("Leyendo el primer archivo...");

    const text = await readFile('./archivo.txt', 'utf-8');

    console.log("Primer texto leido: ", text);

    console.log("----------> Hacer cosas mientras leo el primer archivo...");

    console.log("Leyendo el segundo archivo...");

    const secondtext = await readFile('./archivo2.txt', 'utf-8');

    console.log("Segundo texto leido: ", secondtext);
}

init();

