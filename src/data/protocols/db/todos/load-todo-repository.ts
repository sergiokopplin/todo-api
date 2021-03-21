import { Todo } from '@/domain/models'

export interface LoadTodoRepository {
  load: (todo: LoadTodoRepository.Param) => Promise<LoadTodoRepository.Result>
}

export namespace LoadTodoRepository {
  export type Result = Todo

  export interface Param {
    id: string
    accountId: string
  }
}
