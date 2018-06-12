import { Logger } from 'winston';
import { Request, Response } from 'express';

interface IHealthControllerArgs {
  logger: Logger;
}

class HealthController {
  private readonly logger: Logger;

  constructor(services: IHealthControllerArgs) {
    this.logger = services.logger;
  }

  public reportHealthStats(req: Request, res: Response) {
    return res.json({ ok: true });
  }
}

export default HealthController;
