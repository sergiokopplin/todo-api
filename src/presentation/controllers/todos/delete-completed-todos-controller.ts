import { DeleteCompletedTodos } from '@/domain/usecases'
import { serverError, noResult } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class DeleteCompletedTodosController implements Controller {
  constructor (private readonly deleteCompletedTodos: DeleteCompletedTodos) {}

  async handle (request: DeleteCompletedTodosController.Request): Promise<HttpResponse> {
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
