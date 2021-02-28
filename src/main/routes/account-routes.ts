import { Router } from 'express'

import { makeSignupController } from '@/main/factories'
import { expressRouteAdapt } from '@/main/adapters'

export const accountRoutes = (router: Router): void => {
  router.post('/signup', expressRouteAdapt(makeSignupController()))
}
