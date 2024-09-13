const ERRORES = {
    INVALID_ARGUMENT: {
        "code": 1,
        "message": "El argumento es invalido",
        "name": "INVALID_ARGUMENT",
        "action": (from, detail) => {
            console.log("El error viene de ", from, " con el \ndetalle ", detail);
            console.log("Mandar mail de notificacion");
        }
    }
}

export default ERRORES