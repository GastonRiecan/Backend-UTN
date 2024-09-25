import express from "express";
import ResponseBuilder from "../routes/helpers/ResponseBuilder.util.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	let response = new ResponseBuilder()
		.setOk(true)
		.setStatus(200)
		.setCode('GET_INFO_SUCCESS')
		.setPayload({
			mensaje: "Datos del usuario"
		})
		.build()

	res.send(response);
});

/* 
Estructuras tipicas de respuesta:
{
		ok: boolean,
		status: estatusHTTP,
		payload | data  : objeto con informacion,
		code: number || string
}
{
		ok: boolean,
		status: estatusHTTP,
		payload | data  : objeto con informacion,
		code: number || string,
		message: 'Datos de usuario obtenidos'
}
En caso de error
{
		ok: boolean,
		status: estatusHTTP,
		error
		code: number || string,
		message: 'Datos de usuario obtenidos'
}
{
		ok: boolean,
		payload | data  : objeto con informacion
}
{
		ok: boolean,
		status: estatusHTTP,
		payload: {},
		code: 5,
		message: 'Datos de usuario obtenidos'
}
*/




userRouter.get("/", (req, res) => {
	res.json({
		ok: true,
		payload: {
			cantidad: 10
		},
		code: 'GET_INFO_SUCCESS',
		status: 200
	});
});



export default userRouter;