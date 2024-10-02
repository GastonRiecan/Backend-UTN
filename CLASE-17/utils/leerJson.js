import filesystem from "fs"


const leerJson = async (fileName) => {
    const file = `./data/${fileName}.json`
    try {
        const json = await filesystem.promises.readFile(file, { encoding: 'utf-8' })
        return JSON.parse(json)
    }
    catch (error) {
        throw console.error('Error al leer el archivo JSON', error)
    }
}

export default leerJson