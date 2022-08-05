import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

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

const create = (id: number, email: string, username: string): string => 
  jwt.sign(
    { data: { id, username, email } },
    secret,
    jwtConfig as jwt.SignOptions,
  );

const verify = async (token: string) => 
  jwt.verify(token, secret) as { data: IUserToken };

export default {
  create,
  verify,
};