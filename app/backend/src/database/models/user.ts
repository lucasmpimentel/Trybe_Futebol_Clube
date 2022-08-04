import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;
  public role!: string;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
