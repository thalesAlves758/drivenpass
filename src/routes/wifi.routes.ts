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
wifiRouter.get('/wifi', validateToken, wifiController.getAll);
wifiRouter.get('/wifi/:id', validateToken, wifiController.getById);
wifiRouter.delete('/wifi/:id', validateToken, wifiController.deleteById);

export default wifiRouter;
