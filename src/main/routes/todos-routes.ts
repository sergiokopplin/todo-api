import { Router } from 'express'

import {
  makeAddTodoController,
  makeDeleteTodoController,
  makeDeleteCompletedTodosController,
  makeUpdateTodoController,
  makeLoadTodosController,
  makeLoadTodoController
} from '@/main/factories'
import { expressRouteAdapt } from '@/main/adapters'

export const todosRoutes = (router: Router): void => {
  router.post('/todos', expressRouteAdapt(makeAddTodoController()))
  router.delete('/todos/:id', expressRouteAdapt(makeDeleteTodoController()))
  router.delete(
    '/todos-completed',
    expressRouteAdapt(makeDeleteCompletedTodosController())
  )
  router.put('/todos', expressRouteAdapt(makeUpdateTodoController()))
  router.get('/todos', expressRouteAdapt(makeLoadTodosController()))
  router.get('/todos/:id', expressRouteAdapt(makeLoadTodoController()))
}
