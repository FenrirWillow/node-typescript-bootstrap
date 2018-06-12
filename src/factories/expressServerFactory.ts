import { Logger } from 'winston';
import * as express from 'express';
import * as responseTime from 'response-time';

const responseTimeLogger = (logger: Logger) =>
  (req: express.Request, res: express.Response, time: number) => {
    logger.debug(`Completed ${req.method} ${req.originalUrl} in ${time.toFixed(4)}ms`);
  };

interface IExpressServerFactoryArgs {
  logger: Logger;
  indexRouter: express.Router;
}

function expressServerFactory(cradle: IExpressServerFactoryArgs) {
  const logger: Logger = cradle.logger;
  const indexRouter: express.Router = cradle.indexRouter;

  return new Promise((resolve) => {
    logger.debug('Running expressServerFactory...');

    const server = express();

    server.disable('x-powered-by');

    server.use(responseTime(responseTimeLogger(logger)));

    const port = process.env.SERVER_PORT || 3000;

    server.listen(port, () => {
      logger.info(`Express server has started on port ${port}`);
      server.use('/api/v1/', indexRouter);
      resolve();
    });
  });
}

export default expressServerFactory;
