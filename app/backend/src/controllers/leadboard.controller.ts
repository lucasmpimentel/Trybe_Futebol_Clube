import { Request, Response } from 'express';
import service from '../services/leaderboard.service';

const homeLeadboard = async (_req: Request, res: Response) => {
  const result = await service.homeLeadboard();
  res.status(200).json(result);
};

const awayLeadboard = async (_req: Request, res: Response) => {
  const result = await service.awayLeadboard();
  res.status(200).json(result);
}

export default {
  homeLeadboard,
  awayLeadboard,
}