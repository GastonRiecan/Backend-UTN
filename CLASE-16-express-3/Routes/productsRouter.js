import express from "express";
import filesystem from "fs";

const productRouter = express.Router();


//En este endpoint :product_id es un parametro de busqueda.
//El req.params sera {}
productRouter.get("/detail/:lang/:product_id", (req, res) => {
	const { product_id, lang } = req.params;
	if (lang == "es") {
		res.json({
			ok: true,
			status: 200,
			payload: {
				message: "Detalles del producto " + product_id
			}
		})
	} else {
		res.json({
			ok: true,
			status: 200,
			payload: {
				message: "Products detail " + product_id
			}
		})
	}
	console.log(product_id);


})

//OBTENER TODOS LOS PRODUCTOS.
productRouter.get("/", async (req, res) => {
	try {
		const products = await filesystem.promises.readFile("./data/products.json", { encoding: 'utf-8' });

		const productosJson = JSON.parse(products);

		console.log(res.body);

		res.json({
			ok: true,
			status: 200,
			payload: {
				products: productosJson
			}
		})

	} catch (error) {
		console.error(err);
		return res.json({
			ok: false,
			status: 500,
			payload: {
				message: "ERROR AL OBTENER LOS PRODUCTOS"
			}
		})
	}
}
)

//OBTENER UN PRODUCTO POR SU ID.

productRouter.get("/:product_id", async (req, res) => {
	try {
		// Lee y parsea el archivo JSON
		const products = await filesystem.promises.readFile("./data/products.json", { encoding: 'utf-8' });
		const productsJson = JSON.parse(products);
		const { product_id } = req.params;

		// Busca el producto por su ID
		const indiProduct = productsJson.find(product => product.id == product_id);

		if (!indiProduct) {
			return res.status(404).json({
				ok: false,
				status: 404,
				message: "Product not found"
			});
		}
		// Respuesta con el producto encontrado
		res.json({
			ok: true,
			status: 200,
			payload: {
				message: indiProduct
			}
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			status: 500,
			message: "Server error: " + error.message
		});
	}
});

//AGREGA NUEVO PRODUCTO A products.json Y DEVUELVE LA LISTA ACTUALIZADA.

productRouter.post("/", async (req, res) => {
	const { title, price, categoria, stock } = req.body;

	// Definir las categorías válidas
	const categorias_existentes = ['ROPA', 'ELECTRODOMESTICO', 'JUGUETERIA', 'TECNOLOGIA'];

	// Validaciones:

	// 1. Verificar si el title es un string y no está vacío
	if (typeof title !== 'string' || title.trim() === '') {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'title' es requerido y debe ser un string no vacío."
		});
	}

	// 2. Verificar si el precio es un número y no negativo
	if (typeof price !== 'number' || price < 0) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'price' debe ser un número y no puede ser negativo."
		});
	}

	// 3. Verificar si el stock es un número y no negativo
	if (typeof stock !== 'number' || stock < 0) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'stock' debe ser un número y no puede ser negativo."
		});
	}

	// 4. Verificar si la categoría es válida
	if (!categorias_existentes.includes(categoria)) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: `La categoría '${categoria}' no es válida. Categorías válidas: ${categorias_existentes.join(', ')}.`
		});
	}

	try {
		// Leer y parsear el archivo JSON
		const products = await filesystem.promises.readFile("./data/products.json", { encoding: 'utf-8' });
		const productsJson = JSON.parse(products);

		// 5. Verificar si el producto ya existe (por el título)
		const existingProduct = productsJson.find(product => product.title === title);
		if (existingProduct) {
			return res.status(400).json({
				ok: false,
				status: 400,
				message: "Ya existe un producto con el mismo título."
			});
		}

		// Crear el nuevo producto
		const newProduct = { title, price, categoria, stock };

		// Agregar el nuevo producto
		productsJson.push(newProduct);

		// Escribir el archivo actualizado
		const updatedProducts = JSON.stringify(productsJson, null, 2);
		await filesystem.promises.writeFile("./data/products.json", updatedProducts, 'utf-8');

		// Responder con la lista actualizada de productos
		res.json({
			ok: true,
			status: 201,
			payload: {
				products: productsJson
			}
		});

	} catch (error) {
		// Manejo de errores de lectura/escritura de archivos
		res.status(500).json({
			ok: false,
			status: 500,
			message: "Error del servidor: " + error.message
		});
	}
});

//ACTUALIZA PRODUCTO EN products.json POR ID DE PRODUCTO Y DEVUELVE LA LISTA ACTUALIZADA.

const PROPIEDADES_VALIDAS = ['title', 'price', 'stock', 'categoria'];

productRouter.put("/:product_id", async (req, res) => {
	const { product_id } = req.params;
	const { title, price, stock, categoria } = req.body;

	// Validar propiedades faltantes o inválidas
	const propiedades_invalidas = [];

	for (let propiedad in req.body) {
		if (!PROPIEDADES_VALIDAS.includes(propiedad)) {
			propiedades_invalidas.push(propiedad);
		}
	}

	// Si hay propiedades inválidas, devolver error 400
	if (propiedades_invalidas.length > 0) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: `Propiedades inválidas: ${propiedades_invalidas.join(', ')}`,
			valid_properties: PROPIEDADES_VALIDAS
		});
	}

	// Validaciones de campos
	if (typeof title !== 'string' || title.trim() === '') {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: "El campo 'title' es requerido y debe ser un string no vacío."
		});
	}
	if (typeof price !== 'number' || price < 0) {
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

	const categorias_existentes = ['ROPA', 'ELECTRODOMESTICO', 'JUGUETERIA', 'TECNOLOGIA'];
	if (categoria && !categorias_existentes.includes(categoria)) {
		return res.status(400).json({
			ok: false,
			status: 400,
			message: `La categoría '${categoria}' no es válida. Categorías válidas: ${categorias_existentes.join(', ')}.`
		});
	}

	try {
		// Leer archivo JSON
		const products = await filesystem.promises.readFile("./data/products.json", { encoding: 'utf-8' });
		let productsJson = JSON.parse(products);

		// Buscar producto por id
		const productIndex = productsJson.findIndex(product => product.id == product_id);
		if (productIndex === -1) {
			return res.status(404).json({
				ok: false,
				status: 404,
				message: "Producto no encontrado."
			});
		}

		// Verificar si el título ya existe en otro producto
		const existingProduct = productsJson.find(product => product.title === title && product.id != product_id);
		if (existingProduct) {
			return res.status(400).json({
				ok: false,
				status: 400,
				message: "Ya existe un producto con el mismo título."
			});
		}

		// Actualizar el producto(esta fue la parte mas dificil)
		productsJson[productIndex] = {
			...productsJson[productIndex],
			title: title || productsJson[productIndex].title,
			price: price || productsJson[productIndex].price,
			stock: stock || productsJson[productIndex].stock,
			categoria: categoria || productsJson[productIndex].categoria
		};

		// Guardar el archivo JSON actualizado
		await filesystem.promises.writeFile("./data/products.json", JSON.stringify(productsJson, null, 2), 'utf-8');

		// Responder con el producto actualizado
		res.json({
			ok: true,
			status: 201,
			payload: {
				product: productsJson[productIndex]
			}
		});

	} catch (error) {
		// Manejar error del servidor
		res.status(500).json({
			ok: false,
			status: 500,
			message: "Error del servidor: " + error.message
		});
	}
});


//ELIMINA UN PRODUCTO POR ID
productRouter.delete("/:product_id", async (req, res) => {
	const { product_id } = req.params;

	try {
		// Leer archivo JSON
		const products = await filesystem.promises.readFile("./data/products.json", { encoding: 'utf-8' });
		let productsJson = JSON.parse(products);

		// Buscar producto por id
		const productIndex = productsJson.findIndex(product => product.id == product_id);
		if (productIndex === -1) {
			return res.status(404).json({
				ok: false,
				status: 404,
				message: "Producto no encontrado."
			});
		}

		// Eliminar el producto
		const deletedProduct = productsJson[productIndex];
		productsJson.splice(productIndex, 1);//Elimina el producto del arreglo, sintaxis>
		// splice(index, 1)el uno es la cantidad de elementos que se quieren eliminar

		// Guardar el archivo JSON actualizado	
		await filesystem.promises.writeFile("./data/products.json", JSON.stringify(productsJson, null, 2), 'utf-8');

		// Responder con el proyecto eliminado
		res.json({
			ok: true,
			status: 200,
			payload: {
				message: 'Producto eliminado',
				deletedProduct
			}
		});
	} catch (error) {
		// Manejar error del servidor
		res.status(500).json({
			ok: false,
			status: 500,
			message: "Error del servidor: " + error.message
		});
	}
});



export default productRouter