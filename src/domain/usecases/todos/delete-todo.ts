export interface DeleteTodo {
  delete: (todo: DeleteTodo.Params) => Promise<void>
}

export namespace DeleteTodo {
  export interface Params {
    id: string
    accountId: string
  }
}
