import { DbLoadTodos } from '@/data/usecases';
import { TodosMongoRepository } from '@/infra/db';

export const makeDbLoadTodos = (): DbLoadTodos => {
  const todosMongoRepository = new TodosMongoRepository();
  return new DbLoadTodos(todosMongoRepository);
};
