import Joi from 'joi';
import { WiFiBodyData } from '../types/wifi.types';

const NAME_MAX_LENGTH = 80;
const TAG_MAX_LENGTH = 30;

const wifiSchema = Joi.object<WiFiBodyData>({
  name: Joi.string().max(NAME_MAX_LENGTH).required(),
  password: Joi.string().required(),
  tag: Joi.string().max(TAG_MAX_LENGTH).required(),
});

export default wifiSchema;
