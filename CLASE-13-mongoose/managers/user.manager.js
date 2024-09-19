import ERRORES from "../constants/errors.js"
import Usuario from "../models/user.models.js"




const crearUsuario = async (nombre, email, rol, password, telefono, direccion) => {
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

const buscarUsuarioPorID = async (id) => {
	try {
		const usuario = await Usuario.findById(id)
		return usuario
	}
	catch (error) {
		const customError = ERRORES[error.code]
		console.log(customError);
		console.log(error);
	}
}

const actualizarUsuario = async (id, data) => {
	try {
		const usuarioActualizado = await Usuario.findByIdAndUpdate(id, data)
		console.log(usuarioActualizado);
	}
	catch (error) {
		console.log(error);

	}
}

const eliminarUsuarioPorID = async (id) => {
	try {
		const resultado = await Usuario.findByIdAndDelete(id)
		console.log(resultado);

	}
	catch (error) {
		console.log(error);
	}
}




export { crearUsuario, buscarUsuarioPorID, actualizarUsuario, eliminarUsuarioPorID }