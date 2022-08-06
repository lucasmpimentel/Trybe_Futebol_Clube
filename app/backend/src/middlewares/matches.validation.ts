import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import CustomError from '../utils/CustomError';
import teamsServices from '../services/teams.services';

const newMatchSchema = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
})

const newMatchValidation = async (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  const { error } = newMatchSchema.validate({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  });

  if(error) throw new CustomError(500, error.message);

  if (Number(homeTeam) === Number(awayTeam)) throw new CustomError(
    401, 'It is not possible to create a match with two equal teams'
  )

  await teamsServices.getById(Number(homeTeam));
  await teamsServices.getById(Number(awayTeam));

  next()
}

export default {
  newMatchValidation,
}