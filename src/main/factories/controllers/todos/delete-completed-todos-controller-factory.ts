import { DeleteCompletedTodosController } from '@/presentation/controllers'
import {
  makeDbDeleteCompletedTodos,
  makeLogControllerDecorator
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeDeleteCompletedTodosController = (): Controller => {
  const controller = new DeleteCompletedTodosController(
    makeDbDeleteCompletedTodos()
  )
  return makeLogControllerDecorator(controller)
}
