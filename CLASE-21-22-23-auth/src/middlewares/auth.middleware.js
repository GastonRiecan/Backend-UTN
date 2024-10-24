import jwt from "jsonwebtoken"
import ResponseBuilder from "../utils/builders/responseBuilder.js"
import ENVIROMENT from "../config/enviroment.config.js"


export const verifyTokenMiddleware = (req, res, next) => {
    try {
        const auth_header = req.headers['authorization']
        if (!auth_header) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Falta token de autorizacion')
                .setStatus(401)
                .setPayload({
                    detail: 'Se esperaba un toquen de autorizacion'
                })
                .build()
            return res.status(401).json(response)
        }

        //'Bearer egfwegvfwegfrgelewbg' => ['Bearer, 'sdfasdfasdfdf'] => arr[1]
        const acces_token = auth_header.split(' ')[1]
        if (!acces_token) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('El token de autorizacion esta mal formado')
                .setStatus(401)
                .setPayload({
                    detail: 'Se esperaba un token de autorizacion'
                })
                .build()
            return res.status(401).json(response)
        }

        const decoded = jwt.verify(acces_token, ENVIROMENT.JWT_SECRET)
        //Guardamos en la request la informacion del usuario
        req.user = decoded//IMPORTANTE PARA OBTEDNER DATOS DEL USUARIO!!

        next() //Pasamos al siguiente controlador
    }
    catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setMessage('Fallo al autentificar')
            .setStatus(401)
            .setPayload({
                detail: error.message
            })
            .build()
        return res.status(401).json(response)
    }
}

export const verifyApikeyMiddleware = (req, res, next) => {
    try {
        const apikey_header = req.headers['x-api-key']
        if (!apikey_header) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Falta apikey de acceso')
                .setStatus(401)
                .setPayload({
                    detail: 'se esperaba un api-key'
                })
                .build()
            return res.status(401).json(response)
        }

        if (apikey_header !== ENVIROMENT.API_KEY_INTERN) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Unauthorized')
                .setStatus(401)
                .setPayload({
                    detail: 'Se esperaba una api-key valida'
                })
                .build()
            return res.status(401).json(response)
        }

        next()

    }
    catch (error) {

        const response = new ResponseBuilder()
            .setOk(false)
            .setMessage('Internal server error')
            .setStatus(401)
            .setPayload({
                detail: 'No se pudo validar la api-key'
            })
            .build()
        return res.status(401).json(response)
    }
}