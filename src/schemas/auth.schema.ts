import Joi from 'joi';
import { AuthData } from '../types/user.types';

const MINIMUM = 10;

const authSchema = Joi.object<AuthData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(MINIMUM).required(),
});

export default authSchema;
