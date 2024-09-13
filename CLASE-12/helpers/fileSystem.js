import fileSystem from 'fs';
import { ERRORES } from '../constants/errors.js';

const crearTxt = async (nombre_archivo, texto) => {
    try {
        if (!nombre_archivo) {
            throw { detail: 'El nombre del archivo es requerido.', name: "INVALID_ARGUMENT" };
        }
        if (!texto) {
            throw { detail: 'El texto es requerido.', name: "INVALID_ARGUMENT" };
        }
        fileSystem.writeFileSync('./logs/' + nombre_archivo + '.txt', texto, 'utf8');
        console.dir("Archivo creado con exito");
        return true;
    } catch (error) {
        const errorCustom = ERRORES[error.name];
        if(errorCustom) {
            errorCustom.action("index.js linea 17", error.detail);
        }
        console.log(error);
        console.error("Error al crear el archivo");
        throw error;
    }
}

export { crearTxt }