import filesystem from 'fs'

/* const crearJson = async (fileName, data) => {
	// Prodrian manejar errores 
	// Podrian hacer validaciones
	const file = `./public/${fileName}.json`
	await filesystem.promises.writeFile(file, JSON.stringify(data), { encoding: 'utf-8' })
}
 */


const crearJson = async (fileName, data) => {
	try {
		// Validación de fileName (trim() para que no se pueda eviar un espacio vacio)
		if (typeof fileName !== 'string' || fileName.trim() === '') {
			throw new Error('El nombre del archivo debe ser un string no vacío');
		}

		// Validación de data: debe ser un objeto o un array
		if (typeof data !== 'object' || data === null) {
			throw new Error('Los datos deben ser un objeto o array');
		}

		const file = `./public/${fileName}.json`;

		// Escribir el archivo JSON
		await filesystem.promises.writeFile(file, JSON.stringify(data), { encoding: 'utf-8' });

		console.log(`Archivo ${fileName}.json creado con éxito`);

	} catch (error) {
		console.error(`Error al crear el archivo JSON: ${error.message}`);
		throw new Error(`Error interno: ${error.message}`);
	}
};

const leerJson = async (fileName) => {
	try {
		if (typeof fileName !== 'string' || fileName.trim() === '') {
			throw new Error('El nombre del archivo debe ser un string no vacío');
		}
		const file = `./public/${fileName}.json`;

		const json = await filesystem.promises.readFile(file, { encoding: 'utf-8' });

		return JSON.parse(json);

	} catch (error) {
		console.error(`Error al leer el archivo ${fileName}.json: ${error.message}`);
	}
	throw error;
};

export { crearJson, leerJson }