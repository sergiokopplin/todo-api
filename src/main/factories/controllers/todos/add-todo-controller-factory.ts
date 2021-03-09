import { AddTodoController } from '@/presentation/controllers'
import {
  makeAddTodoValidation,
  makeDbAddTodo,
  makeLogControllerDecorator
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeAddTodoController = (): Controller => {
  const controller = new AddTodoController(
    makeAddTodoValidation(),
    makeDbAddTodo()
  )
  return makeLogControllerDecorator(controller)
}
