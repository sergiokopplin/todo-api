import { DbDeleteCompletedTodos } from '@/data/usecases';
import { TodosMongoRepository } from '@/infra/db';

export const makeDbDeleteCompletedTodos = (): DbDeleteCompletedTodos => {
  const todosMongoRepository = new TodosMongoRepository();
  return new DbDeleteCompletedTodos(todosMongoRepository);
};
