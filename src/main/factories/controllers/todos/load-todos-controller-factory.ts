import { LoadTodosController } from '@/presentation/controllers'
import { makeDbLoadTodos, makeLogControllerDecorator } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeLoadTodosController = (): Controller => {
  const controller = new LoadTodosController(makeDbLoadTodos())
  return makeLogControllerDecorator(controller)
}
