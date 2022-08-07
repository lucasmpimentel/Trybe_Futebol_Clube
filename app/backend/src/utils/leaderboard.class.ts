import Teams from '../database/models/teams';
import { ITeam } from '../interfaces/teams.interfaces';

type TleaderBoard = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

export { TleaderBoard };

export default class Leaderboard {
  private _id: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;

  constructor(id: number) {
    this._id = id;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
  }

  get id() {
    return this._id;
  }

  victory() {
    this._totalVictories += 1;
  }

  draw() {
    this._totalDraws += 1;
  }

  losse() {
    this._totalLosses += 1;
  }

  goalsFavor(goals: number) {
    this._goalsFavor += goals;
  }

  goalsOwn(goals: number) {
    this._goalsOwn += goals;
  }

  async finish() {
    const team: ITeam = await Teams.findByPk(this._id) as any;
    const totalPoints = (this._totalVictories * 3) + this._totalDraws;
    const totalGames = this._totalVictories + this._totalDraws + this._totalLosses;
    const result = {
      name: team?.teamName,
      totalPoints,
      totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsFavor - this._goalsOwn,
      efficiency: Number((((totalPoints / (totalGames * 3)) * 100)).toFixed(2)),
    };
    return result as TleaderBoard;
  }
}