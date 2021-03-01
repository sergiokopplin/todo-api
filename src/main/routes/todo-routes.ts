import { Router } from 'express'

import { makeAddTodoController } from '@/main/factories'
import { expressRouteAdapt } from '@/main/adapters'

export const todoRoutes = (router: Router): void => {
  router.post('/add-todo', expressRouteAdapt(makeAddTodoController()))
}
