import { Todo } from '@/domain/models'

export interface AddTodo {
  add: (todo: AddTodo.Params) => Promise<AddTodo.Result>
}

export namespace AddTodo {
  export type Result = Todo

  export interface Params {
    title: string
    dueDate: Date
    theme: string
  }
}
