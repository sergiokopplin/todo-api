export interface AddTodoRepository {
  add: (title: string) => Promise<AddTodoRepository.Result>
}

export namespace AddTodoRepository {
  export interface Result {
    id: string
    title: string
    completed: boolean
  }
}
