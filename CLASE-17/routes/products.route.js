import express from 'express'
import filesystem from 'fs'
import { v4 as uuidV4 } from 'uuid'
import { VALIDATIONS } from '../utils/validations.utils.js';
import leerJson from '../utils/leerJson.js';
import guardarJson from '../utils/guardarJson.js'

const productsRouter = express.Router()

const categorias_existentes = ['ROPA', 'ELECTRODOMESTICO', 'JUGUETERIA', 'TECNOLOGIA'];

//OBTENER PRODUCTO POR ID:(Chequeado ok)
productsRouter.get('/:product_id', async (req, res) => {
	try {
		const lista_de_productos = await leerJson('products')
		const { product_id } = req.params
		const productoBuscado = lista_de_productos.find((producto) => producto.id === product_id)
		if (!productoBuscado) {
			return res.json({
				ok: false,
				status: 404,
				payload: {
					message: 'Product not found'
				}
			})
		}
		res.json({
			ok: true,
			status: 200,
			payload: {
				message: 'Product obtained',
				product: productoBuscado
			}
		})
	}
	catch (error) {
		console.error('Error al obtener productos', error)
		res.json({
			ok: false,
			status: 500,
			payload: {
				message: 'Internal server error',
				detail: error.message
			}
		})
	}
})

// ACTUALIZAR PRODUCTO POR ID:(Chequeado ok)
productsRouter.put('/:product_id', async (req, res) => {
	const PROPIEDADES_VALIDAS = ['title', 'price', 'stock', 'categoria']
	const propiedades_invalidas = []
	const CATEGORIAS_EXISTENTES = categorias_existentes
	try {
		const { product_id } = req.params
		const productoRecibido = req.body
		const product_list = await filesystem.promises.readFile('./data/products.json', 'utf-8')
		const lista_parseada = JSON.parse(product_list)
		/* Caso
		/api/products/33685737-3aec-4141-8d47-191259c914fa
		{title: 'Tv samsung 2', price: 200, stock: 1, categoria: 'TECNOLOGIA'}
		*/
		//some devuelve un boolean
		const tituloRepetido = lista_parseada.some(product => {
			//Caso excepcion, si el id del producto recorrido es igual al id del producto a actualizar
			if (product.id === product_id) {
				return false
			}
			product.title === productoRecibido.title
		})
		if (tituloRepetido) {
			res.json({
				ok: false,
				status: 400,
				payload: {
					message: 'Ya existe este producto'
				}
			})
		}

		/* {title: 'Tv samsung 2', price: 200, stock: 1, categoria: 'TECNOLOGIA', nombre: 'pepe'} */
		for (const propiedad in productoRecibido) {
			if (!PROPIEDADES_VALIDAS.includes(propiedad)) {
				propiedades_invalidas.push(propiedad)
			}
		}
		if (propiedades_invalidas.length > 0) {
			return res.json({
				ok: false,
				status: 400,
				payload: {
					message: 'Error, Propiedades inválidas',
					campos_invalidos: propiedades_invalidas,
					campos_validos: PROPIEDADES_VALIDAS
				}
			})
		} else if (!VALIDATIONS.NUMBER({ value: productoRecibido.stock })) {
			return res.json({
				ok: false,
				status: 400,
				payload: {
					error: 'Error, stock inválido'
				}
			})
		} else if (!VALIDATIONS.NUMBER({ value: productoRecibido.price })) {
			return res.json({
				ok: false,
				status: 400,
				payload: {
					error: 'Error, precio inválido'
				}
			})
		} else if (!VALIDATIONS.STRING({ value: productoRecibido.title })) {
			return res.json({
				ok: false,
				status: 400,
				payload: {
					error: 'Error, titulo inválido'
				}
			})
		} else if (!VALIDATIONS.INCLUIDO({ value: productoRecibido.categoria, array: categorias_existentes })) {
			return res.json({
				ok: false,
				status: 400,
				payload: {
					error: 'Error, categoría inválida o no pertenece a las categorías existentes'
				}
			})
		} else {
			productoRecibido.id = product_id
			const posicionProducto = lista_parseada.findIndex(producto => producto.id == product_id)
			lista_parseada.splice(posicionProducto, 1, productoRecibido)
			filesystem.writeFileSync('./data/products.json', JSON.stringify(lista_parseada), 'utf-8')
			res.json({
				ok: true,
				status: 201,
				payload: {
					message: 'Product updated',
					product: productoRecibido
				}
			})
		}
	} catch (error) {
		console.error(error)
		res.json({
			ok: false,
			status: 500,
			payload: {
				message: 'Falló el servidor',
				detail: error.message
			}
		})
	}
})

// OBTENER PRODUCTOS(Chequeado ok)
productsRouter.get('/', async (req, res) => {
	try {
		const product_list = await filesystem.promises.readFile('./data/products.json', 'utf-8')
		res.json({
			ok: true,
			status: 200,
			payload: {
				message: 'Products obtained',
				products: JSON.parse(product_list)
			}
		})
	}
	catch (error) {
		console.error(error)
		res.json({
			ok: false,
			status: 500,
			payload: {
				message: 'Internal server error',
				detail: error.message
			}
		})
	}
})

//CREAR UN PRODUCTO(chequeado ok)
productsRouter.post("/", async (req, res) => {
	console.log(req.body)
	const { title, price, categoria, stock } = req.body;

	if (!VALIDATIONS.STRING({ value: title })) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: `El campo 'title' es requerido y debe ser un string no vacío. valor recibido: ${title}`
		});
	}

	if (!VALIDATIONS.NUMBER({ value: price } || !VALIDATIONS.NUMERO_POSITIVO({ value: price }))) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'price' debe ser un número y no puede ser negativo."
		});
	}

	if (typeof stock !== 'number' || stock < 0) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'stock' debe ser un número y no puede ser negativo."
		});
	}

	if (!categorias_existentes.includes(categoria)) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: `La categoría '${categoria}' no es válida. Categorías válidas: ${categorias_existentes.join(', ')}.`
		});
	}

	try {
		const products = await filesystem.promises.readFile("./data/products.json", { encoding: 'utf-8' });
		const productsJson = JSON.parse(products);

		const existingProduct = productsJson.find(product => product.title === title);
		if (existingProduct) {
			return res.status(400).json({
				ok: false,
				status: 400,
				message: "Ya existe un producto con el mismo título."
			});
		}

		const newProduct = { title, price, categoria, stock, id: uuidV4() };

		productsJson.push(newProduct);

		const updatedProducts = JSON.stringify(productsJson, null, 2);
		await filesystem.promises.writeFile("./data/products.json", updatedProducts, 'utf-8');

		res.json({
			ok: true,
			status: 201,
			payload: {
				products: productsJson
			}
		});

	} catch (error) {
		res.status(500).json({
			ok: false,
			status: 500,
			message: "Error del servidor: " + error.message
		});
	}
});

//ELIMINAR UN PRODUCTO:

productsRouter.delete('/:product_id', async (req, res) => {
	try {
		let lista_de_productos = await leerJson('products');

		const { product_id } = req.params;
		//Tuve que verificar el tipo de dato del id de producto, number o string.
		const productoAEliminarIndex = lista_de_productos.findIndex((producto) => {
			if (typeof producto.id === 'number') {
				return producto.id === parseInt(product_id);
			}
			return producto.id === product_id;
		});


		if (productoAEliminarIndex === -1) {
			return res.status(404).json({
				ok: false,
				message: 'Product not found'
			});
		}

		const productoEliminado = lista_de_productos[productoAEliminarIndex];

		console.log('Eliminando', productoEliminado);


		lista_de_productos = lista_de_productos.filter((producto) => producto.id
			!== lista_de_productos[productoAEliminarIndex].id);

		await guardarJson('products', lista_de_productos);

		res.status(200).json({
			ok: true,
			message: 'Product deleted',
			product: productoEliminado
		});
	} catch (error) {
		console.error('Error al eliminar producto', error);
		res.status(500).json({
			ok: false,
			message: 'Internal server error',
			detail: error.message
		});
	}
});


export default productsRouter
