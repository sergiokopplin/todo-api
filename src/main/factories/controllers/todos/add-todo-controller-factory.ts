import { AddTodoController } from '@/presentation/controllers'
import { makeAddTodoValidation, makeDbAddTodo } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeAddTodoController = (): Controller => {
  return new AddTodoController(makeAddTodoValidation(), makeDbAddTodo())
}
