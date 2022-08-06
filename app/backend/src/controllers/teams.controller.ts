import { Request, Response } from 'express';
import service from '../services/teams.services';

const getAll = async (_req: Request, res: Response) => {
  const teams = await service.getAll();
  res.status(200).json(teams);
}

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await service.getById(Number(id));
  res.status(200).json(team);
}

export default {
  getAll,
  getById,
}