import userRouter from "./routes/user.route.js";

import express from "express";

const app = express();
const PORT = 3000;

//MIDDLEWARE es una aplicacion (funcion) que se ejecuta entre medio de una consulta.

//MIDDLEWARE para poder recibir json en el body
app.use(express.json())

//MIDDLEWARE para poder recibir informacion de tipo x-www-urlencoded
app.use(express.urlencoded({ extended: true }))


app.get('/ping', (request, response) => {
	response.send('pong')
})
app.post('/enviar', (request, response) => {
	console.log(request.body)
	response.send('Recibido')
})


//Registamos la ruta /api/users y delegamos las consultas recibidas a esta ruta al userRouter
app.use('/api/users', userRouter)

app.listen(PORT, () => {
	console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})
