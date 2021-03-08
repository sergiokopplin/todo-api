import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadTodos } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'

export class LoadTodosController implements Controller {
  constructor(private readonly loadTodos: LoadTodos) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.loadTodos.loadAll()
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
