export interface LoadTodoRepository {
  load: (todo: LoadTodoRepository.Param) => Promise<LoadTodoRepository.Result>
}

export namespace LoadTodoRepository {
  export interface Param {
    id: string
  }

  export interface Result {
    id: string
    title: string
    completed: boolean
  }
}
