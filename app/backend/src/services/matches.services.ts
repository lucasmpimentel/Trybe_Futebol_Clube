import CustomError from '../utils/CustomError';
import Matches from '../database/models/matches';
import Match from '../utils/match.class';
import teamsServices from './teams.services';
import { IMatch, INewMatch } from '../interfaces/matches.interfaces';

const getAll = async (query: string) => {
  const matches: IMatch[] = await Matches.findAll() as any;
  if (!matches) throw new CustomError(404, 'Matches not found');

  
  const result: Match[] = await Promise.all(matches.map(async (match: IMatch) => {
    const team = new Match(
      match.id,
      match.homeTeam,
      match.homeTeamGoals,
      match.awayTeam,
      match.awayTeamGoals,
      match.inProgress,
    )
    const teamHome = await teamsServices.getById(Number(match.homeTeam)) as any;
    const teamAway = await teamsServices.getById(Number(match.awayTeam)) as any;
    
    return {...team, teamHome: { teamName: teamHome.teamName }, teamAway: { teamName: teamAway.teamName } };
  }));
  
  if (query !== '') {
    const filtered = result.filter((match) => String(match.inProgress) === query);
    return filtered;
  }

  return result;
};

const create = async (body: INewMatch) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
  const { id } = await Matches.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: 1,
  });

  const result = { id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true }
  return result;
};

const editStatus = async (id: number) => {
  const [ editedRows ] = await Matches.update({ inProgress: Number(0) }, { where: { id } });
  const result = Number(editedRows) === 1
  if (result) return { "message": "Finished" };
  throw new CustomError(409, 'Cannot change the match');
};

export default {
  getAll,
  create,
  editStatus,
};
