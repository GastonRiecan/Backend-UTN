import express from 'express';
import statusRouter from './router/status.router.js';
import dotenv from 'dotenv';

//Va  aleer el archivo .env y guardara los valores en process.env
dotenv.config();

const app = express();
const port = process.env.port || 3000;

app.use('/api/status', statusRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));

