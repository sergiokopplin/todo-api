import { Todo } from '@/domain/models'

export interface LoadTodosRepository {
  loadAll: (accountId: string) => Promise<LoadTodosRepository.Result[]>
}

export namespace LoadTodosRepository {
  export type Result = Todo
}
