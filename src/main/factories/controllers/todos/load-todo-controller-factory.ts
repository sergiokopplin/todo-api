import { LoadTodoController } from '@/presentation/controllers'
import {
  makeLoadTodoValidation,
  makeDbLoadTodo,
  makeLogControllerDecorator
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeLoadTodoController = (): Controller => {
  const controller = new LoadTodoController(
    makeLoadTodoValidation(),
    makeDbLoadTodo()
  )
  return makeLogControllerDecorator(controller)
}
