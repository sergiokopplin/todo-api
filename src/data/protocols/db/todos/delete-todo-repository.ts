export interface DeleteTodoRepository {
  delete: (id: string) => Promise<void>
  deleteCompleted: () => Promise<void>
}
