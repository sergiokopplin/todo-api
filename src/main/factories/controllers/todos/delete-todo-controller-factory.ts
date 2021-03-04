import { DeleteTodoController } from '@/presentation/controllers'
import { makeDeleteTodoValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { makeDbDeleteTodo } from '../../usecases/todos/delete-todo-factory'

export const makeDeleteTodoController = (): Controller => {
  return new DeleteTodoController(
    makeDeleteTodoValidation(),
    makeDbDeleteTodo()
  )
}
