import { crearUsuario, buscarUsuarioPorID } from "./managers/user.manager.js"

crearUsuario("Gaston", "b5j5J@example.com", "admin", "admin123", "123456789", "Calle 123")

buscarUsuarioPorID("6323d6d9b9a9b9b9b9b9b9b9")

    .then(
        (retorno) => {
            console.log(retorno)
        }
    )
    .catch(
        (error) => {
            console.log("Ocurrio una exepcion ", error)
        }
    )
    .finally(
        () => {
            console.log("Proceso terminado")
        }
    )