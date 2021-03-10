import { DeleteTodoRepository } from '@/data/protocols'
import { DeleteCompletedTodos } from '@/domain/usecases'

export class DbDeleteCompletedTodos implements DeleteCompletedTodos {
  constructor(private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete(): Promise<void> {
    return await this.deleteTodoRepository.deleteCompleted()
  }
}
