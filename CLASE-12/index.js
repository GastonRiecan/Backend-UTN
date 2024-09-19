import { type } from "os";
import { mongoose } from "./config/mongoDB.config.js";
import ERRORES from "./constants/errors.js";

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


const creararUsuario = async (nombre, email, rol, password, telefono, direccion) => {
	try {
		const usuario = new Usuario({
			nombre,
			email,
			rol,
			password,
			telefono,
			direccion
		})
		const resultado = await usuario.save()
		return resultado
	}
	catch (error) {
		const customError = ERRORES[error.code]
		console.log(customError);
		console.log(error);
	}
}

creararUsuario("Gaston", "b5j5J@example.com", "admin", "admin123", "123456789", "Calle 123")