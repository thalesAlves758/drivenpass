import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema.middleware';
import validateToken from '../middlewares/validateToken.middleware';
import wifiSchema from '../schemas/wifi.schema';
import * as wifiController from '../controllers/wifi.controller';

const wifiRouter = Router();

wifiRouter.post(
  '/wifi',
  validateToken,
  validateSchema(wifiSchema),
  wifiController.create
);

export default wifiRouter;
