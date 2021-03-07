export interface UpdateTodoRepository {
  update: (
    todo: UpdateTodoRepository.Params
  ) => Promise<UpdateTodoRepository.Result>
}

export namespace UpdateTodoRepository {
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
