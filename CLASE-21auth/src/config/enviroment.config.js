import dotenv from 'dotenv';

//Va  aleer el archivo .env y guardara los valores en process.env
dotenv.config();

const ENVIROMENT = {
    port: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER
}

export default ENVIROMENT