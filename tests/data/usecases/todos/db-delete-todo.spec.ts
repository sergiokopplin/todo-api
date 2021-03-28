import { DbDeleteTodo } from '@/data/usecases';
import { DeleteTodoRepositorySpy } from '@/tests/data/mocks';
import { mockDeleteTodoParams } from '@/tests/domain/mocks';
import { throwError } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: DbDeleteTodo;
  deleteTodoRepositorySpy: DeleteTodoRepositorySpy;
}

const makeSut = (): SutTypes => {
  const deleteTodoRepositorySpy = new DeleteTodoRepositorySpy();
  const sut = new DbDeleteTodo(deleteTodoRepositorySpy);

  return {
    sut,
    deleteTodoRepositorySpy,
  };
};

describe('DbDeleteTodo', () => {
  test('Should throw if DeleteTodoRepositorySpy throws', async () => {
    const { sut, deleteTodoRepositorySpy } = makeSut();
    jest.spyOn(deleteTodoRepositorySpy, 'delete').mockImplementationOnce(throwError);
    const promise = sut.delete(mockDeleteTodoParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call DeleteTodoRepositorySpy with correct id', async () => {
    const { sut, deleteTodoRepositorySpy } = makeSut();
    const addAccountParams = mockDeleteTodoParams();
    await sut.delete(addAccountParams);
    expect(deleteTodoRepositorySpy.id).toBe(addAccountParams.id);
  });
});
