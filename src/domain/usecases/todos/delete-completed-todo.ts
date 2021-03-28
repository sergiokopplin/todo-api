export interface DeleteCompletedTodos {
  delete: (accountId: string) => Promise<void>;
}
