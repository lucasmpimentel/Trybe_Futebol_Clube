import { Request, Response } from 'express';
import { INewMatch } from '../interfaces/matches.interfaces';
import service from '../services/matches.services';
import CustomError from '../utils/CustomError';
import token from '../utils/token.utils';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query as any;
  if (inProgress) {
    const filteredMatches = await service.getAll(inProgress);
    return res.status(200).json(filteredMatches);
  }
  const matches = await service.getAll('');
  res.status(200).json(matches);
};

const create = async (req: Request, res: Response) => {
  const body = req.body as INewMatch;
  const result = await service.create(body);
  res.status(201).json(result);
};

const editStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await service.editStatus(Number(id));
  res.status(200).json(result)
};

const editScore = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;
  const result = await service.editScore(
    Number(homeTeamGoals),
    Number(awayTeamGoals),
    Number(id),
  );
  res.status(200).json(result);
};

export default {
  getAll,
  create,
  editStatus,
  editScore,
};
