import { DbDeleteTodo } from '@/data/usecases'
import { TodosMongoRepository } from '@/infra/db'

export const makeDbDeleteTodo = (): DbDeleteTodo => {
  const todosMongoRepository = new TodosMongoRepository()
  return new DbDeleteTodo(todosMongoRepository)
}
