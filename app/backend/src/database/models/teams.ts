import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Example extends Model {
  public id!: number;
}

Example.init({
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

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */