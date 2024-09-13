import mongoose from "mongoose";

const DB_NAME = "APP_HOMEWORKING_UTN_TM"
const DB_URL = "mongodb://localhost:27017"
const DB_CONNECTION_STRING = `${DB_URL}/${DB_NAME}`

mongoose.connect(DB_CONNECTION_STRING)

const database = mongoose.connection

database.once("open", () => {
	console.log("Conexion exitosa con mongo-bd");
})

database.on("error", () => {
	console.log("ERROR MONGO DB");
})

//Estamos exportando a mongoose queya esta conectado, database para poder interactuar con la base de datos.
export { mongoose, database }