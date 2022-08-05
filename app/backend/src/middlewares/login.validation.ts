import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import CustomError from '../utils/CustomError';

const loginSchema = Joi.object(
  {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }
);

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) throw new CustomError(400, error.message);

  next();
};

export default {
  loginValidation,
}