import {
  makeUpdateTodoValidation,
  makeDbUpdateTodo,
  makeLogControllerDecorator
} from '@/main/factories'
import { UpdateTodoController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateTodoController = (): Controller => {
  const controller = new UpdateTodoController(makeUpdateTodoValidation(), makeDbUpdateTodo())
  return makeLogControllerDecorator(controller)
}
