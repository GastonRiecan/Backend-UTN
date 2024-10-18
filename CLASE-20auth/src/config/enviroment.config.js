import dotenv from 'dotenv';

//Va  aleer el archivo .env y guardara los valores en process.env
dotenv.config();

const ENVIROMENT = {
    port: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET
}

export default ENVIROMENT