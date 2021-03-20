import { Todo } from '@/domain/models'

export interface AddTodoRepository {
  add: (todo: AddTodoRepository.Params) => Promise<AddTodoRepository.Result>
}

export namespace AddTodoRepository {
  export type Result = Todo
  export type Params = Pick<Todo, 'title' | 'dueDate' | 'theme'>
}
