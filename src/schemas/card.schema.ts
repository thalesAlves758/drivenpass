import Joi from 'joi';
import { CardBodyData } from '../types/card.types';

const MAX_PASSWORD_LENGTH = 6;
const passwordRegex = /[0-9]{4,6}/;
const securityCodeRegex = /[0-9]{3}/;
const SECURITY_CODE_LENGTH = 3;

const cardSchema = Joi.object<CardBodyData>({
  number: Joi.string().creditCard().required(),
  cardholderName: Joi.string().required(),
  password: Joi.string()
    .max(MAX_PASSWORD_LENGTH)
    .pattern(passwordRegex)
    .required(),
  securityCode: Joi.string()
    .length(SECURITY_CODE_LENGTH)
    .pattern(securityCodeRegex)
    .required(),
  type: Joi.string().valid('CREDIT', 'DEBIT', 'BOTH').required(),
  virtual: Joi.boolean().required(),
  tag: Joi.string().required(),
});

export default cardSchema;
