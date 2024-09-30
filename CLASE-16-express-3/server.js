import express from "express";
import productsRouter from "./Routes/productsRouter.js";


const app = express();
const PORT = 6000;

//Middleware para habilitar que nuetra aplicacion reciba json en el body.
app.use(express.json());

app.get("/ping", (req, res) => {
	res.json({
		ok: true,
		status: 200,
		payload: {
			message: "pong"
		}
	})
})


/* 
Armar un endpoint para obtener un listado de usuarios
*/

app.post("/ping", (req, res) => {
	console.log(req.body);

	res.json({
		ok: true,
		status: 200,
		payload: {
			message: "Ping recibido"
		}
	})
})


app.use("/api/products", productsRouter);






app.listen(PORT, () => {
	console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);
});