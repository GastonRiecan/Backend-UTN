/* Este archivo lo usamos para probar nuestros endpoints */

const URL_API = 'http://localhost:8000'
const obtenerProductoPorId = async (id) => {
	const response = await fetch(
		`${URL_API}/api/products/${id}`,
		{
			method: 'GET'
		}
	)
	const data = await response.json()
	console.log(data)
}

const obtenerProductos = async () => {
	const response = await fetch(
		`${URL_API}/api/products`,
		{
			method: 'GET'
		}
	)
	const data = await response.json()
	console.log(data)
}


const crearProducto = async ({ title, price, categoria, stock }) => {
	const response = await fetch(
		`${URL_API}/api/products`,
		{
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, price, categoria, stock })
		}
	)
	const data = await response.json()
	console.log(data)
}

const actualizarProductoPorId = async (product_id, newProduct) => {
	const response = await fetch(
		`${URL_API}/api/products/${product_id}`,
		{
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newProduct)
		}
	)
	console.log({ response })
	const data = await response.json()
	console.log(data)
}


/* crearProducto({title: 'Tv samsung 2', categoria: 'TECNOLOGIA', stock: 1, price: 400}) */

actualizarProductoPorId('33685737-3aec-4141-8d47-191259c914fa', { title: 'Tv samsung 2', categoria: 'TECNOLOGIA', stock: 3, price: 200 })