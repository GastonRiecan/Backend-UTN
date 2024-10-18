import express from 'express';
import { loginController, registerUserController, verifyEmailValidationTokenController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', registerUserController);

authRouter.get('/verify/:verificationToken', verifyEmailValidationTokenController)

authRouter.post('/login', loginController)

authRouter.post('/login', () => { })

export default authRouter