/* eslint-disable max-lines-per-function */
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import Leaderboard, { TleaderBoard } from '../utils/leaderboard.class';
import { IMatch } from '../interfaces/matches.interfaces';

const victory = (match: any, homeTeam?: Leaderboard, awayTeam?: Leaderboard) => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    homeTeam?.victory();
    awayTeam?.losse();
  } else if (match.homeTeamGoals < match.awayTeamGoals) {
    homeTeam?.losse();
    awayTeam?.victory();
  } else {
    homeTeam?.draw();
    awayTeam?.draw();
  }
};

const goals = (match: any, homeTeam?: Leaderboard, awayTeam?: Leaderboard) => {
  homeTeam?.goalsFavor(match.homeTeamGoals);
  awayTeam?.goalsFavor(match.awayTeamGoals);
  homeTeam?.goalsOwn(match.awayTeamGoals);
  awayTeam?.goalsOwn(match.homeTeamGoals);
};

const sortLeardBoard = (a: TleaderBoard, b: TleaderBoard) => {
  if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints as number;
  if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories as number;
  if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance as number;
  if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor as number;
  return 0;
};

export const homeLeadboard = async () => {
  const matches = await Matches.findAll({ where: { inProgress: false } });
  const leaderBoard = matches.reduce<Leaderboard[]>((acc, match: any) => {
    let homeTeam = acc.find(({ id }: { id: number }) => id === match.homeTeam);
    if (homeTeam === undefined) homeTeam = new Leaderboard(match.homeTeam);
    victory(match, homeTeam);
    goals(match, homeTeam);
    const prevAcc = acc.filter(({ id }: { id: number }) => id !== match.homeTeam);
    return [...prevAcc, homeTeam];
  }, []);
  const leaderBoardResolve = await Promise.all(
    leaderBoard.map((team: Leaderboard) => team.finish()),
  );
  leaderBoardResolve.sort(sortLeardBoard);
  return leaderBoardResolve;
};

export const awayLeadboard = async () => {
  const matches = await Matches.findAll({ where: { inProgress: false } });
  const leaderBoard = matches.reduce<Leaderboard[]>((acc, match: any) => {
    let awayTeam = acc.find(({ id }: { id: number }) => id === match.awayTeam);
    if (awayTeam === undefined) awayTeam = new Leaderboard(match.awayTeam);
    victory(match, undefined, awayTeam);
    goals(match, undefined, awayTeam);
    const prevAcc = acc.filter(({ id }: { id: number }) => id !== match.awayTeam);
    return [...prevAcc, awayTeam];
  }, []);
  const leaderBoardResolve = await Promise.all(
    leaderBoard.map((team: Leaderboard) => team.finish()),
  );
  leaderBoardResolve.sort(sortLeardBoard);
  return leaderBoardResolve as TleaderBoard[];
};

export default {
  homeLeadboard,
  awayLeadboard,
};