import { Router } from 'express'

import {
  makeAddTodoController,
  makeDeleteTodoController,
  makeUpdateTodoController,
  makeLoadTodosController
} from '@/main/factories'
import { expressRouteAdapt } from '@/main/adapters'

export const todosRoutes = (router: Router): void => {
  router.post('/todos', expressRouteAdapt(makeAddTodoController()))
  router.delete('/todos', expressRouteAdapt(makeDeleteTodoController()))
  router.put('/todos', expressRouteAdapt(makeUpdateTodoController()))
  router.get('/todos', expressRouteAdapt(makeLoadTodosController()))
}
