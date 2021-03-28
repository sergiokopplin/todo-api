import faker from 'faker';

import { Todo } from '@/domain/models';
import { AddTodo, DeleteTodo, UpdateTodo, LoadTodo } from '@/domain/usecases';

const mockTodo: Todo = {
  title: faker.random.words(3),
  completed: false,
  id: faker.datatype.uuid(),
  dueDate: new Date('2021-03-17T23:18:04.822Z'),
  theme: 'blank',
  accountId: faker.datatype.uuid(),
};

const { title, completed, id, dueDate, theme, accountId } = mockTodo;

export const mockAddTodoParams = (): AddTodo.Params => ({
  title,
  dueDate,
  theme,
  accountId,
});
export const mockDeleteTodoParams = (): DeleteTodo.Params => ({ id, accountId });
export const mockLoadTodoParams = (): LoadTodo.Param => ({ id, accountId });
export const mockUpdateTodoParams = (): UpdateTodo.Params => ({
  title,
  completed,
  id,
  dueDate,
  theme,
  accountId,
});
