import { DeleteTodoController } from '@/presentation/controllers'
import {
  makeDeleteTodoValidation,
  makeDbDeleteTodo,
  makeLogControllerDecorator
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeDeleteTodoController = (): Controller => {
  const controller = new DeleteTodoController(
    makeDeleteTodoValidation(),
    makeDbDeleteTodo()
  )
  return makeLogControllerDecorator(controller)
}
