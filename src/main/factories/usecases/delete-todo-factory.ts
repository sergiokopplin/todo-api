import { DbDeleteTodo } from '@/data/usecases'
import { TodoMongoRepository } from '@/infra/db'

export const makeDbDeleteTodo = (): DbDeleteTodo => {
  const todoMongoRepository = new TodoMongoRepository()
  return new DbDeleteTodo(todoMongoRepository)
}
