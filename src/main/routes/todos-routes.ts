import { Router } from 'express';

import { expressRouteAdapt } from '@/main/adapters';
import {
  makeAddTodoController,
  makeDeleteTodoController,
  makeDeleteCompletedTodosController,
  makeUpdateTodoController,
  makeLoadTodosController,
  makeLoadTodoController,
} from '@/main/factories';
import { auth } from '@/main/middlewares';

export const todosRoutes = (router: Router): void => {
  router.post('/todos', auth, expressRouteAdapt(makeAddTodoController()));
  router.delete('/todos/:id', auth, expressRouteAdapt(makeDeleteTodoController()));
  router.delete('/todos-completed', auth, expressRouteAdapt(makeDeleteCompletedTodosController()));
  router.put('/todos', auth, expressRouteAdapt(makeUpdateTodoController()));
  router.get('/todos', auth, expressRouteAdapt(makeLoadTodosController()));
  router.get('/todos/:id', auth, expressRouteAdapt(makeLoadTodoController()));
};
