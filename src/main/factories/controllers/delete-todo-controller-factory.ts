import { DeleteTodoController } from '@/presentation/controllers'
import { makeDeleteTodoValidation, makeDbDeleteTodo } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeDeleteTodoController = (): Controller => {
  return new DeleteTodoController(
    makeDeleteTodoValidation(),
    makeDbDeleteTodo()
  )
}
