import * as bcrypt from 'bcryptjs';
import token from '../utils/token.utils';
import CustomError from '../utils/CustomError';
import User from '../database/models/user';

const login = async (email: string, password: string) => {
  const getUser = await User.findOne({ where: { email } });
  if (!getUser) throw new CustomError(404, 'User not found');
  const { id, username }= getUser;

  const matchPass = bcrypt.compareSync(password, getUser.password);

  if (getUser.email === email && matchPass) {
    const result = token.create(id, username, email)
    return result;
  }
  throw new CustomError(401, 'Invalid email or password');
}

export default {
  login,
}