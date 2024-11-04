import express from 'express';
import {
    forgotPassswordController,
    loginController,
    registerUserController,
    resetTokenController,
    verifyEmailValidationTokenController
} from '../controllers/auth.controller.js';
import { verifyApikeyMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', verifyApikeyMiddleware, registerUserController);

authRouter.get('/verify/:verificationToken', verifyEmailValidationTokenController)

authRouter.post('/login', verifyApikeyMiddleware, loginController)

authRouter.post('/forgot-password', verifyApikeyMiddleware, forgotPassswordController)

authRouter.put('/reset-password/:reset_token', verifyApikeyMiddleware, resetTokenController)

export default authRouter