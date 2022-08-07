import * as express from 'express';
import login from './middlewares/login.validation';
import match from './middlewares/matches.validation'

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
  .get(matchController.getAll)
  .post(login.verifyRole, match.newMatchValidation, matchController.create);

routes.route('/matches/:id')
  .patch(login.verifyRole, match.changeMatchValidation, matchController.editScore)

routes.route('/matches/:id/finish')
  .patch(login.tokenValidation, matchController.editStatus)

export default routes;
