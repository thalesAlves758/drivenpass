import { Request, Response } from 'express';
import { createWifi } from '../services/wifi.services';
import { HttpStatus } from '../types/http.types';
import { UserData } from '../types/user.types';
import { WiFiBodyData, WiFInsertData } from '../types/wifi.types';

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
