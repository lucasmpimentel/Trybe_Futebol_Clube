import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Matches from './matches';

class Teams extends Model {
  public id!: number;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Matches.belongsTo(
  Teams,
  { foreignKey: 'homeTeam', as: 'teamHome' },
);
Matches.belongsTo(
  Teams,
  { foreignKey: 'awayTeam', as: 'teamAway' },
);

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'MatchesTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'MatchesAway' });

export default Teams;
