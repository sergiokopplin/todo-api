import { DeleteTodoRepository } from '@/data/protocols'
import { DeleteCompletedTodos } from '@/domain/usecases'

export class DbDeleteCompletedTodos implements DeleteCompletedTodos {
  constructor (private readonly deleteTodoRepository: DeleteTodoRepository) {}

  async delete (accountId: string): Promise<void> {
    await this.deleteTodoRepository.deleteCompleted(accountId)
  }
}
