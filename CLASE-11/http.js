const http = require('http');

const { findAvailablePort } = require('./freePort.js');

const server = http.createServer((request, response) => {
	console.log(request.url + "request recibido");
	response.end('Hola mundo, este es el primer servidor que activo con node.js');
});

findAvailablePort(3000).then(port => {
	server.listen(port, () => {
		console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
	})
})

