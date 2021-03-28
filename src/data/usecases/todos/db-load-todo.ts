import { LoadTodoRepository } from '@/data/protocols';
import { LoadTodo } from '@/domain/usecases';

export class DbLoadTodo implements LoadTodo {
  constructor(private readonly loadTodoRepository: LoadTodoRepository) {}

  async load(todo: LoadTodo.Param): Promise<LoadTodo.Result> {
    return await this.loadTodoRepository.load(todo);
  }
}
