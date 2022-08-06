import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import CustomError from '../utils/CustomError';
import token from '../utils/token.utils';
import loginServices from '../services/login.services';

const loginSchema = Joi.object(
  {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }
);

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) throw new CustomError(400, 'All fields must be filled');

  next();
};

const tokenSchema = Joi.object(
  {
    token: Joi.string().required(),
  }
);

const tokenValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(401, 'Token must be a valid token');

  const { error } = tokenSchema.validate({ token: authorization });
  if (error) throw new CustomError(400, error.message);

  const { data } = token.verify(authorization);
  if (!data) throw new CustomError(401, 'Token must be a valid token');

  next();
};

const verifyRole = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(401, 'Token must be a valid token');

  const { data } = token.verify(authorization);
  if (!data) throw new CustomError(401, 'Token must be a valid token');

  const user = await loginServices.getByEmail(data.email);
  if (user.role !== 'admin') throw new CustomError(401, 'Token must be a valid token');

  next();
}

export default {
  loginValidation,
  tokenValidation,
  verifyRole,
}