import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequestError, serverError } from '@/presentation/helpers'
import { DeleteTodo } from '@/domain/usecases'

export class DeleteTodoController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTodo: DeleteTodo
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      await this.deleteTodo.delete(request)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteTodoController {
  export interface Request {
    id: string
  }
}
