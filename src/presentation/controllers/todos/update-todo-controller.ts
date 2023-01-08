import { UpdateTodo } from '@/domain/usecases'
import { badRequestError, ok, serverError, notFoundError } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateTodoController implements Controller {
  constructor (private readonly validation: Validation, private readonly updateTodo: UpdateTodo) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const result = await this.updateTodo.update(request)
      if (!result) {
        return notFoundError()
      }
      return result && ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateTodoController {
  export interface Request {
    id: string
    title: string
    completed: boolean
  }
}
