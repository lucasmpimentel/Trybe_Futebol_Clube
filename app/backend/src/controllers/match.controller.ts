import { Request, Response } from 'express';
import service from '../services/matches.services';

const getAll = async (_req: Request, res: Response) => {
  const matches = await service.getAll();
  res.status(200).json(matches);
};

export default {
  getAll,
};
