export interface DeleteTodoRepository {
  delete: (id: string) => Promise<void>
}
