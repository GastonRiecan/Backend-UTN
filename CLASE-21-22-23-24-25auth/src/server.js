import ENVIROMENT from './config/enviroment.config.js';
import express from 'express';
import configDb from './db/config.js';
import cors from 'cors';
import statusRouter from './router/status.router.js';
import authRouter from './router/auth.router.js';
import productRouter from './router/products.router.js';


const app = express();
const port = ENVIROMENT.BACKPORT || 3000;
app.use(cors())

app.use(express.json());

app.use('/api/status', statusRouter);

app.use('/api/auth', authRouter)

app.use('/api/products', productRouter)

app.listen(port, () => console.log(`Server listening on port ${port}`));

