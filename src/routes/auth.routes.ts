import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import validateSchema from '../middlewares/validateSchema.middleware';
import authSchema from '../schemas/auth.schema';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(authSchema), authController.signUp);
authRouter.post('/sign-in', validateSchema(authSchema), authController.signIn);

export default authRouter;
