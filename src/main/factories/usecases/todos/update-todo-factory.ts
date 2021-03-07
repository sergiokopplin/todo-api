import { DbUpdateTodo } from '@/data/usecases'
import { TodosMongoRepository } from '@/infra/db'

export const makeDbUpdateTodo = (): DbUpdateTodo => {
  const todosMongoRepository = new TodosMongoRepository()
  return new DbUpdateTodo(todosMongoRepository)
}
