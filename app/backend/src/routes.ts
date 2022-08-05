import * as express from 'express';
import login from './middlewares/login.validation';

import loginController from './controllers/login.controller'

const routes = express.Router();

routes.route('/login')
  .post(login.loginValidation, loginController.login)

routes.route('/login/validate')
  .get(login.tokenValidation, loginController.auth)

export default routes;
