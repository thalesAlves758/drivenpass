import Joi from 'joi';
import { IAuthData } from '../types/user.types';

const MINIMUM = 10;

const authSchema = Joi.object<IAuthData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(MINIMUM).required(),
});

export default authSchema;
