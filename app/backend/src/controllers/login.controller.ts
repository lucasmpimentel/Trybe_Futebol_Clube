import { Request, Response } from 'express';
import { ILoginEntry } from '../interfaces/login.interfaces';
import service from '../services/login.services';

const login = async (req: Request, res: Response) => {
  const { email, password }: ILoginEntry = req.body;
  const token = await service.login(email, password);
  res.status(200).json({ token });
};

export default {
  login
}