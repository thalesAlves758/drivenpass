import Joi from 'joi';
import { SafeNoteBodyData } from '../types/safeNode.types';

const TITLE_MAX_LENGTH = 50;
const NOTE_MAX_LENGTH = 1000;

const safeNoteSchema = Joi.object<SafeNoteBodyData>({
  title: Joi.string().max(TITLE_MAX_LENGTH).required(),
  note: Joi.string().max(NOTE_MAX_LENGTH).required(),
});

export default safeNoteSchema;
