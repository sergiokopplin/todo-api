import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, noResult } from '@/presentation/helpers'
import { DeleteCompletedTodos } from '@/domain/usecases'

export class DeleteCompletedTodosController implements Controller {
  constructor(private readonly deleteCompletedTodos: DeleteCompletedTodos) {}

  async handle(
    request: DeleteCompletedTodosController.Request
  ): Promise<HttpResponse> {
    try {
      await this.deleteCompletedTodos.delete(request.accountId)
      return noResult()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteCompletedTodosController {
  export interface Request {
    accountId: string
  }
}
