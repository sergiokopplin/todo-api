import { UpdateTodoRepository } from '@/data/protocols'
import { UpdateTodo } from '@/domain/usecases'

export class DbUpdateTodo implements UpdateTodo {
  constructor (private readonly updateTodoRepository: UpdateTodoRepository) {}
  async update (todo: UpdateTodo.Params): Promise<UpdateTodo.Result> {
    return await this.updateTodoRepository.update(todo)
  }
}
