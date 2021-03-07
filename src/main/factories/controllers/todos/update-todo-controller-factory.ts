import { UpdateTodoController } from '@/presentation/controllers'
import { makeUpdateTodoValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeUpdateTodoController = (): Controller => {
  return new UpdateTodoController(makeUpdateTodoValidation())
}
