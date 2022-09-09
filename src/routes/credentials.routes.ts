import { Router } from 'express';
import validateToken from '../middlewares/validateToken.middleware';
import * as credentialController from '../controllers/credential.controller';
import validateSchema from '../middlewares/validateSchema.middleware';
import credentialSchema from '../schemas/credential.schema';

const credentialsRouter = Router();

credentialsRouter.post(
  '/credentials',
  validateToken,
  validateSchema(credentialSchema),
  credentialController.create
);

export default credentialsRouter;
