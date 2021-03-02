import { DeleteTodoController } from '@/presentation/controllers'
import { makeDeleteTodoValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeDeleteTodoController = (): Controller => {
  return new DeleteTodoController(makeDeleteTodoValidation())
}
