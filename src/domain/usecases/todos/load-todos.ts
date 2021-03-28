import { Todo } from '@/domain/models';

export interface LoadTodos {
  loadAll: (accountId: string) => Promise<LoadTodos.Result>;
}

export namespace LoadTodos {
  export type Result = Todo[];
}
