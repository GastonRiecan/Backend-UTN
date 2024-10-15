//Motores de plantilla o templates engine
//Tambien aprendemos a configurar archivos estaticos
//HANDLEBARS

import express from 'express'
import handlebars from 'express-handlebars'


const app = express()

const PORT = 5000

//Indicar a nuesto server que pueda enviar los archivos estaticos dentro de la carpeta /public
app.use(express.static('./public'))

//Middleware que nos transforma las consultas enviadas con url-encoded a objeto (BODY)
app.use(express.urlencoded({ extended: true }))

//Indicamos que a los archivos con extension handlebars deberemos tratarlos usando la libreria handlebars
app.engine('handlebars', handlebars.engine())

//Cuando el servidor quiera renderizar respuestas, lo hara usando a handlebars
app.set('view engine', 'handlebars')
app.set('views', './views');

const productos = [
	{
		id: 1,
		nombre: 'Tv samsung',
		precio: 100,
		descripcion: 'La mejor tv',
		stock: 5
	},
	{
		id: 2,
		nombre: 'Tv LG',
		precio: 150,
		descripcion: 'La mejor tv',
		stock: 10
	},
	{
		id: 3,
		nombre: 'Tv Noblex',
		precio: 200,
		descripcion: 'La mejor tv',
		stock: 54
	}
]

app.get('/', (req, res) => {
	try {


		/* throw new Error('No hay productos ahora') */

		const response = {
			status: 200,
			message: "Productos obtenidos",
			ok: true,
			data: {
				titulo: 'Titulo X',
				fecha_hoy: '3/10/2024',
				valor_dolar: 1200,
				productos
			},
			layout: 'products' //El nombre del layout que queremos mostrar
		}
		res.render('home', response)
	}
	catch (error) {
		const response = {
			status: 500,
			message: "Internal server error",
			ok: false,
			data: {
				detail: error.message
			}
		}
		res.render('home', response)
	}

})

app.get('/products/new', (req, res) => {
	res.render('product-form', {
		data: {
			errors: {
				nombre: null,
				stock: null,
				precio: null,
				descripcion: null
			},
			form_state: {
				product: {
					nombre: '',
					precio: '',
					descripcion: '',
					stock: ''
				}
			}
		}
	})
})

app.post('/products/new', (req, res) => {
	const { nombre, precio, stock, descripcion } = req.body
	const newProduct = { nombre, precio, stock, descripcion }
	console.log('Recibido!')
	/* 
	Si el producto se creo, 
	redireccionar a lista de producto o detalle de producto
	sino, mostrar el formulario con el error ocasionado
	*/
	const errores = {
		nombre: null,
		stock: null,
		precio: null,
		descripcion: null
	}
	if (!req.body.nombre.trim() || !isNaN(req.body.nombre)) {
		errores.nombre = 'No se puede enviar un valor numerico o vacio!'
	}
	if (!req.body.precio.trim() || isNaN(req.body.precio.trim())) {
		errores.precio = 'El precio debe ser un numero!'
	}
	if (!req.body.stock.trim() || isNaN(req.body.stock.trim())) {
		errores.stock = 'El stock debe ser un numero!'
	}
	console.log(errores)

	//Transformo mi obj de errores a arr de valores
	//Ej: Object.values({nombre: 'Hay error',stock: null,precio: null,descripcion: null}) => ['hay error', null, null, null]
	let hayError = Object.values(errores).some(error => error !== null)
	if (hayError) {
		return res.render(
			'product-form',
			{
				data: {
					errors: errores,
					form_state: {
						product: newProduct
					}
				}

			}
		)
	}

	productos.push({ ...newProduct, id: productos.length + 1 })
	res.redirect('/')
})

/* 
Method: GET 
Endpoint: /product/:product_id/update
Accion: Mostrar formulario de actualizacion
Descripcion:
Recibiran un id por parametro de busqueda, deberan buscar ese producto y renderizar un formulario para actualizar el producto, el formulario cargara los valores actuales del producto

Ejemplo de respuesta: 
res.render('update-product-form',{
	errores: {
		nombre: null,
		stock: null,
		precio: null,
		descripcion: null
	},
	form_state: {
		product: {
			id: 1,
			nombre: 'Tv samsung',
			precio: 100,
			descripcion: 'La mejor tv',
			stock: 5
		}
	}
})

Ejemplo de plantilla:

<form action="/product/{{this.form_state.product.id}}/update" method="POST">

	<input type='submit' value="Actualizar" />
</form>


Method: POST
Endpoint /product/:product_id/update
Accion: Actualizar Producto
Descripcion:
Deberemos tener una ruta para actualizar producto, cuando se nos envie el producto deberemos validar los campos:
stock, precio, nombre (como en la ruta de POST). Si hay error, deberemos mostrar el error y NO actualizar
Si no hay errores deberemos actualizar el producto con los nuevos valores (NO agregar Ni cambiar el id bajo ningun termino)
Cuando se actualize redireccionar a '/product/:product_id'

*/


app.get('/products/:product_id', (req, res) => {
	const { product_id } = req.params
	//Aqui pueden validar el product_id
	const producto_buscado = productos.find(producto => producto.id === Number(product_id))
	const response = {
		ok: true,
		message: 'Producto obtenido',
		status: 200,
		data: {
			product: {
				...producto_buscado,
				esCaro: producto_buscado.precio > 100
			}
		}
	}
	res.render('product-detail', response)
})

app.get('/products/:product_id/update', (req, res) => {
	const { product_id } = req.params
	const producto_buscado = productos.find(producto => producto.id === Number(product_id))
	console.log(producto_buscado)
	res.render('product-form-update', {
		data: {
			errors: {
				nombre: null,
				stock: null,
				precio: null,
				descripcion: null
			},
			form_state: {
				product: {
					id: producto_buscado.id,
					nombre: producto_buscado.nombre,
					stock: producto_buscado.stock,
					precio: producto_buscado.precio,
					descripcion: producto_buscado.descripcion
				}
			}
		}
	})
})

app.post('/products/:product_id/update', (req, res) => {
	const { product_id } = req.params
	const { nombre, precio, stock, descripcion } = req.body
	const updatedProduct = { nombre, precio, stock, descripcion }

	const errors = {
		nombre: null,
		precio: null,
		stock: null,
		descripcion: null
	}

	if (!nombre.trim() || !isNaN(nombre)) {
		errors.nombre = 'No se puede enviar un valor numérico o vacío'
	}

	if (!precio.trim() || isNaN(precio.trim())) {
		errors.precio = 'El precio debe ser un valor numérico'
	}

	if (!stock.trim() || isNaN(stock.trim())) {
		errors.stock = 'El stock debe ser un valor numérico'
	}

	let hayError = Object.values(errors).some(error => error !== null)

	if (hayError) {
		return res.render(
			'product-form-update',
			{
				data: {
					errors: errors,
					form_state: {
						product: { ...updatedProduct, id: product_id }
					}
				}
			}
		)
	}

	const productInd = productos.findIndex(producto => producto.id === Number(product_id))

	productos[productInd] = {
		...productos[productInd],
		nombre,
		precio,
		stock,
		descripcion
	}

	res.redirect(`/products/${product_id}`)
}
)



app.listen(PORT, () => {
	console.log(
		`La aplicacion se esta ejecutando en http://localhost:${PORT}`
	)
})