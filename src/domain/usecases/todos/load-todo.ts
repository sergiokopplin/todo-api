import { Todo } from '@/domain/models'

export interface LoadTodo {
  load: (id: string) => Promise<LoadTodo.Result>
}

export namespace LoadTodo {
  export type Result = Todo
}
