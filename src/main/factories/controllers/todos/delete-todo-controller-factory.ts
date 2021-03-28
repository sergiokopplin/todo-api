import {
  makeDeleteTodoValidation,
  makeDbDeleteTodo,
  makeLogControllerDecorator,
} from '@/main/factories';
import { DeleteTodoController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeDeleteTodoController = (): Controller => {
  const controller = new DeleteTodoController(makeDeleteTodoValidation(), makeDbDeleteTodo());
  return makeLogControllerDecorator(controller);
};
