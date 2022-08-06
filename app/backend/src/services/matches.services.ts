import CustomError from '../utils/CustomError';
import Matches from '../database/models/matches';
import Match from '../utils/match.class';
import teamsServices from './teams.services';
import { IMatch } from '../interfaces/matches.interfaces';

const getAll = async () => {
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
  }))

  return result;
}

export default {
  getAll,
};
