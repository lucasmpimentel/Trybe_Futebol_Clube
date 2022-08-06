import * as express from 'express';
import login from './middlewares/login.validation';

import loginController from './controllers/login.controller';
import teamsController from './controllers/teams.controller';
import matchController from './controllers/match.controller';

const routes = express.Router();

routes.route('/login')
  .post(login.loginValidation, loginController.login);

routes.route('/login/validate')
  .get(login.tokenValidation, loginController.auth);

routes.route('/teams')
  .get(teamsController.getAll);

routes.route('/teams/:id')
  .get(teamsController.getById);

routes.route('/matches')
  .get(matchController.getAll);

export default routes;
