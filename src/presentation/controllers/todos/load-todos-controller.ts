import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadTodos } from '@/domain/usecases'
import { serverError } from '@/presentation/helpers'

export class LoadTodosController implements Controller {
  constructor(private readonly loadTodos: LoadTodos) {}

  async handle(): Promise<HttpResponse> {
    try {
      await this.loadTodos.loadAll()
    } catch (error) {
      return serverError(error)
    }
  }
}
