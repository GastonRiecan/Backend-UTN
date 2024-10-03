//Motores de plantillas o template engine
//Configuracion de archivos estaticos.
//HANDLEBARS

import express from 'express'
import { engine } from 'express-handlebars'

const app = express()

//Indicamos que a los archivos con extension handlebars deberemos tratarlos usando la libreria handlebars.
app.engine('handlebars', engine())

//Cuando el servidor quiera renderizar respuesta lo hara usando handlebars
app.set('view engine', 'handlebars')

app.set('views', './views')

const productos = [
	{
		id: 1,
		nombre: 'Tv samsung',
		precio: 100,
		descripcion: 'La mejor tv',
		stock: 10
	},
	{
		id: 2,
		nombre: 'Tv LG',
		precio: 150,
		descripcion: 'La mejor tv',
		stock: 15
	},
	{
		id: 3,
		nombre: 'Tv Noblex',
		precio: 200,
		descripcion: 'La mejor tv',
		stock: 20
	}
]

app.get('/', (req, res) => {
	try {


		//throw new Error(', No hay productos ahora.')

		const response = {
			status: 200,
			message: 'Productos obtenidos',
			ok: true,
			data: {
				Titulo: 'Titulo x',
				Fecha: '3/10/2024',
				valor_dolar: 1200,
				productos
			},
			layout: 'products'
		}
		res.render('home', response)
	}

	catch (error) {
		const response = {

			status: 500,
			message: 'Internal server error',
			ok: true,
			data: {
				detail: error.message
			}
		}
		res.render('home', response)
	}

})

const PORT = 5000

//Indicar a nuestro server que pueda enviar los archivos estaticos dentro de la carpeta public
app.use(express.static('./public'))

app.get('/products/:product_id', (req, res) => {
	const { product_id } = req.params
	//Aqui hay que validar el product_id
	const producto_buscado = productos.find(producto => producto.id === Number(product_id))
	const response = {
		ok: true,
		message: "Producto Obtenido",
		status: 200,
		data: {
			product: producto_buscado
		}
	}
	res.render('product-detail', response)
})

app.listen(PORT, () => {
	console.log(`La aplicacion se esta ejecutando en http://localhost:${PORT}`);
})
