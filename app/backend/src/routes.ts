import * as express from 'express';

const routes = express.Router();

routes.route('/teste').get((_req: any, res: any) => {
  res.status(200).send('funcionando')
})

export default routes;