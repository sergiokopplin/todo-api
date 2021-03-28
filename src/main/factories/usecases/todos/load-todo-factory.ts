import { DbLoadTodo } from '@/data/usecases';
import { TodosMongoRepository } from '@/infra/db';

export const makeDbLoadTodo = (): DbLoadTodo => {
  const todosMongoRepository = new TodosMongoRepository();
  return new DbLoadTodo(todosMongoRepository);
};
