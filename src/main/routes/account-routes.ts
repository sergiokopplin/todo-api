import { Router } from 'express';

import { expressRouteAdapt } from '@/main/adapters';
import { makeLoginController, makeSignupController } from '@/main/factories';

export const accountRoutes = (router: Router): void => {
  router.post('/signup', expressRouteAdapt(makeSignupController()));
  router.post('/login', expressRouteAdapt(makeLoginController()));
};
