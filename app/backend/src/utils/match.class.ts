import { ITeamName, ITeam } from "../interfaces/teams.interfaces";
import teamService from '../services/teams.services';

export default class Match {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;

  constructor(
    id: number,
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
    inProgress: number,
  ) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.homeTeamGoals = homeTeamGoals
    this.awayTeam = awayTeam
    this.awayTeamGoals = awayTeamGoals
    const status = inProgress === 1;
    this.inProgress = status;
  };
}