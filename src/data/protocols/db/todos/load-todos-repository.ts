export interface LoadTodosRepository {
  loadAll: () => Promise<LoadTodosRepository.Result[]>
}

export namespace LoadTodosRepository {
  export interface Result {
    id: string
    title: string
    completed: boolean
  }
}
