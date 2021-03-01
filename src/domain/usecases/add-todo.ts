export interface AddTodo {
  add: (todo: AddTodo.Params) => Promise<AddTodo.Result>
}

export namespace AddTodo {
  export interface Params {
    title: string
  }

  export type Result = boolean
}
