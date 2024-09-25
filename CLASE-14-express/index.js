//EXPRESS

//Nos permite crear APIS
import express from 'express'
import filesystem from 'fs'

//Aqui guardaremos nuestra api
const app = express()

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }))//Tengo que agreagar el extended: true, por que solo esta deprecated, ya tira un mensaje en consola.

app.get('/', (req, res) => {
	res.send("Estas en la pagina home /")
})

app.get('/fecha', (req, res) => {
	res.send(new Date().toString())
})


//POST usuario
/*
Deben usar filesystem y asincronia

Vamos a verificar que valores hay en ./usuarios.json
Si la respuesta es '':
Crearemos un array y agregaremos el usuario recibido.

Si la respuesta !'':
Vamos a transformar la respuesta a objeto de JS y agregaremos al usuario recibido.

Finalmente lo guardamos en usuarios.json.

*/
//Request es donde se guardan los datos de la consulta

app.post('/usuario', async (req, res) => {

	const usuario = {
		nombre: req.body.nombre,
		email: req.body.email
	}

	let usuarios

	const resultado = await filesystem.promises.readFile('./usuarios.json', 'utf-8')
	if (!resultado) {
		usuarios = []
	} else {
		//En caso de que haya usuarios:
		usuarios = JSON.parse(resultado)
	}
	usuarios.push(usuario)

	await filesystem.writeFile('./usuarios.json', JSON.stringify(usuarios), { encoding: 'utf-8' })

	res.send("Usuario registrado con exito")

})

/* 
2)
Validar que la consulta este bien hecha, es decir que reciba el nombre y el email
En caso de no recibir deberemos responder con el detalle del error:
Ej:
{nombre:''} => Falta ingresar nombre
Aplicar try catch sobre el codigo, si alguna operacion como readFile, writeFile, JSON.parse o JSON.stringrify falla
debemos capturar el fallo en el catch, mostrar dicho fallo por consola de error y responder con un 'Fallo interno en el servidor'

*/

app.post('/usuario2', async (req, res) => {
	try {
		const nombre = req.body.nombre
		const email = req.body.email

		if (!nombre) {
			return res.json({ error: "Falta ingresar nombre" });
		}
		if (!email) {
			return res.json({ error: "Falta ingresar email" });
		}

		const usuario = {
			nombre,
			email
		};

		let usuarios;

		const resultado = await filesystem.promises.readFile('./usuarios.json', 'utf-8');

		if (!resultado) {
			usuarios = [];
		} else {
			usuarios = JSON.parse(resultado);
		}

		usuarios.push(usuario);

		await filesystem.promises.writeFile('./usuarios.json', JSON.stringify(usuarios), { encoding: 'utf-8' });

		res.send("Usuario registrado con éxito");

	} catch (error) {
		console.log(error);
		res.send("Fallo interno en el servidor");
	}
});





app.listen(3000, () => {
	console.log("App corriendo en el puerto 3000 :)");

})
