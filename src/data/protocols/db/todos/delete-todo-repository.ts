export interface DeleteTodoRepository {
  delete: (id: string, accountId: string) => Promise<void>;
  deleteCompleted: (accountId: string) => Promise<void>;
}
