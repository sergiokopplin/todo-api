import { Todo } from '@/domain/models'

export interface UpdateTodoRepository {
  update: (todo: UpdateTodoRepository.Params) => Promise<UpdateTodoRepository.Result>
}

export namespace UpdateTodoRepository {
  export type Params = Todo
  export type Result = Todo
}
