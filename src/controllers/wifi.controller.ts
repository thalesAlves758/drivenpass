import { Request, Response } from 'express';
import {
  createWifi,
  findWifiByIdAndUserId,
  findWifiFromUserId,
} from '../services/wifi.services';
import { HttpStatus } from '../types/http.types';
import { UserData } from '../types/user.types';
import {
  WiFiBodyData,
  WiFInsertData,
  WiFiResponseData,
} from '../types/wifi.types';

export async function create(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;
  const wifiData: WiFiBodyData = req.body;

  const insertData: WiFInsertData = {
    ...wifiData,
    userId,
  };

  await createWifi(insertData);

  res.sendStatus(HttpStatus.CREATED);
}

export async function getAll(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;

  const wifi: WiFiResponseData[] = await findWifiFromUserId(userId);

  res.send(wifi);
}

export async function getById(req: Request, res: Response) {
  const { id: userId }: UserData = res.locals.user;
  const wifiId: number = Number(req.params.id);

  const wifi: WiFiResponseData = await findWifiByIdAndUserId(userId, wifiId);

  res.send(wifi);
}
