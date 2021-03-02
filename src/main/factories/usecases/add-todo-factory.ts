import { DbAddTodo } from '@/data/usecases'
import { TodoMongoRepository } from '@/infra/db'

export const makeDbAddTodo = (): DbAddTodo => {
  const todoMongoRepository = new TodoMongoRepository()
  return new DbAddTodo(todoMongoRepository)
}
