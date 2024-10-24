import ENVIROMENT from './config/enviroment.config.js';
import express from 'express';
import statusRouter from './router/status.router.js';


import configDb from './db/config.js';
import authRouter from './router/auth.router.js';
import transporter from './config/transporter.config.js';
import cors from 'cors';
import { verifyApikeyMiddleware } from './middlewares/auth.middleware.js';


const app = express();
const port = ENVIROMENT.BACKPORT || 3000;
app.use(cors())
app.use(express.json());
app.use(verifyApikeyMiddleware)

app.use('/api/status', statusRouter);

app.use('/api/auth', authRouter)

app.listen(port, () => console.log(`Server listening on port ${port}`));

