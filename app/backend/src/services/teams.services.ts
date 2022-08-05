import CustomError from '../utils/CustomError';
import Teams from '../database/models/teams';

const getAll = async () => {
  const teams = await Teams.findAll();
  if (!teams) throw new CustomError(404, 'Not found');
  return teams;
};

export default {
  getAll,
}