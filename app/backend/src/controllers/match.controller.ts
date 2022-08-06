import { Request, Response } from 'express';
import { stringify } from 'querystring';
import service from '../services/matches.services';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query as any;
  if (inProgress) {
    const filteredMatches = await service.getAll(inProgress);
    return res.status(200).json(filteredMatches);
  }
  const matches = await service.getAll('');
  res.status(200).json(matches);
};

export default {
  getAll,
};
