export interface UpdateTodo {
  update: (todo: UpdateTodo.Params) => Promise<UpdateTodo.Result>
}

export namespace UpdateTodo {
  export interface Params {
    id: string
    title: string
    completed: boolean
  }

  export interface Result {
    id: string
    title: string
    completed: boolean
  }
}
