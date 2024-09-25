//Object.freeze
//Es inmutable
//No se puede editar las propiedades
//No se puede crear propiedades
//No se puede eliminar propiedades

const RESPONSE_TYPES = Object.freeze({
	"ERROR": "ERROR_RESPONSE",
	"SUCCESS": "SUCCESS_RESPONSE",
	"REDIRECT": "REDIRECT_RESPONSE"
})

//Una propiedad static significa que la puedo acceder desde la misma clase
/* 
Ejemplo:
class ClaseX{
	static valor = 9
}
console.log(ClaseX.valor) //esto mostrara 9 por consola
*/
class ResponseBuilder {
	static CODE = Object.freeze({
		GET_INFO_SUCCESS: 'GET_INFO_SUCCESS',
	})
	constructor() {
		this.response = {
			ok: false,
			status: 500,
			payload: {}
		}
	}
	setStatus(status) {
		this.response.status = status
		return this
	}
	setOk(ok) {
		this.response.ok = ok
		return this
	}
	setPayload(payload) {
		this.response.payload = payload
		return this
	}
	setCode(code) {
		this.code = code
		return this
	}
	build() {
		return this.response
	}
}


export default ResponseBuilder

/* 
{
	response:{
		ok:  false, 
		status: 500,
		payload: {}
	} 
} */
/* const respuesta = new ResponseBuilder()
.setOk(true)
.setPayload({mensaje: 'hola'})
.setStatus(200)
.build() */

/* 
Por defecto mi response builder va a ser una respuesta erronea
*/