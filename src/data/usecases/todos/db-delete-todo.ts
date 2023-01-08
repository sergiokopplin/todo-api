import { DeleteTodoRepository } from '@/data/protocols'
import { DeleteTodo } from '@/domain/usecases'

export class DbDeleteTodo implements DeleteTodo {
  constructor (private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete (todo: DeleteTodo.Params): Promise<void> {
    await this.deleteTodoRepository.delete(todo.id, todo.accountId)
  }
}
