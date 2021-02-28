import { Router } from 'express'

import { makeLoginController, makeSignupController } from '@/main/factories'
import { expressRouteAdapt } from '@/main/adapters'

export const accountRoutes = (router: Router): void => {
  router.post('/signup', expressRouteAdapt(makeSignupController()))
  router.post('/login', expressRouteAdapt(makeLoginController()))
}
