import { type } from "os";
import { mongoose } from "./config/mongoDB.config.js";

/* 
MongoDB NO TIENE SCHEMAS
Mongoose trae schemas */

const usuarioSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		rol: { type: String, required: true },
		password: { type: String, required: true },
		telefono: { type: String, required: true },
		direccion: { type: String, required: true },
		fecha_registro: { type: Date, default: Date.now },
	}
)

const Usuario = mongoose.model("Usuario", usuarioSchema)

new Usuario({
	nombre: 'Gaston',
	email: 'g.e.riecan@gmail.com',
	rol: 'user',
	password: 'asd123',
	telefono: '1245234346453',
	direccion: 'los ret'
}).save()
	.then(() => console.log('Usuario creado con éxito'))
	.catch(err => console.error(err));