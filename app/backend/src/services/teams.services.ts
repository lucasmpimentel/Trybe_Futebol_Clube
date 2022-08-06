import CustomError from '../utils/CustomError';
import Teams from '../database/models/teams';

const getAll = async () => {
  const teams = await Teams.findAll();
  if (!teams) throw new CustomError(404, 'Not found');
  return teams;
};

const getById = async (id: number) => {
  const team = await Teams.findByPk(id);
  if (!team) throw new CustomError(404, 'There is no team with such id!');
  return team;
}

export default {
  getAll,
  getById,
}