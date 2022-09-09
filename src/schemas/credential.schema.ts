import Joi from 'joi';
import { CredentialBodyData } from '../types/credential.types';

const MAX = 50;

const credentialSchema = Joi.object<CredentialBodyData>({
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  tag: Joi.string().max(MAX).required(),
});

export default credentialSchema;
