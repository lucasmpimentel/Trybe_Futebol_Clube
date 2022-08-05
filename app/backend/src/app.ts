import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import error from './middlewares/error.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors())
    this.config();
    
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(routes);
    this.app.use(error);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
