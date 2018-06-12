import { Router } from 'express';
import HealthController from '../controllers/healthController';

interface IHealthRouterArgs {
  healthController: HealthController;
}

function createHealthRouter(services: IHealthRouterArgs) {
  const healthRouter = Router();

  healthRouter.get('/', services.healthController.reportHealthStats);

  return healthRouter;
}

export default createHealthRouter;
