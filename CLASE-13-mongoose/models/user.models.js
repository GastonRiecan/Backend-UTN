import mongoose from "../config/mongoDB.config.js";


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

export default Usuario