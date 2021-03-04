import { Router } from 'express'

import {
  makeAddTodoController,
  makeDeleteTodoController
} from '@/main/factories'
import { expressRouteAdapt } from '@/main/adapters'

export const todosRoutes = (router: Router): void => {
  router.post('/todos', expressRouteAdapt(makeAddTodoController()))
  router.delete('/todos', expressRouteAdapt(makeDeleteTodoController()))
}
