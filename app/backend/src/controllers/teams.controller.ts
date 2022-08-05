import { Request, Response } from 'express';
import service from '../services/teams.services';

const getAll = async (_req: Request, res: Response) => {
  const teams = await service.getAll();
  res.status(200).json(teams);
}

export default {
  getAll,
}