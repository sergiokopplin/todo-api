import { DbAddTodo } from '@/data/usecases'
import { TodosMongoRepository } from '@/infra/db'

export const makeDbAddTodo = (): DbAddTodo => {
  const todosMongoRepository = new TodosMongoRepository()
  return new DbAddTodo(todosMongoRepository)
}
