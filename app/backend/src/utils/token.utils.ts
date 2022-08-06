import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import CustomError from './CustomError';

export interface IUserToken {
  id: number;
  username: string;
  email: string;
}
export interface IJwtConfig {
  expiresIn: string;
  algorithm: string;
}

const secret = process.env.JWT_SECRET as string;
const jwtConfig: IJwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const create = (id: number, username: string, email: string): string => 
  jwt.sign(
    { data: { id, username, email } },
    secret,
    jwtConfig as jwt.SignOptions,
  );

const verify = (token: string) => {
  try {
      return jwt.verify(token, secret) as { data: IUserToken };
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }
};

export default {
  create,
  verify,
};