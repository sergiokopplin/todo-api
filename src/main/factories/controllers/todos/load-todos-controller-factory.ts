import { LoadTodosController } from '@/presentation/controllers'
import { makeDbLoadTodos } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeLoadTodosController = (): Controller => {
  return new LoadTodosController(makeDbLoadTodos())
}
