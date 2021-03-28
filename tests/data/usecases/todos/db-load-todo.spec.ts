import { DbLoadTodo } from '@/data/usecases';
import { LoadTodoRepositorySpy } from '@/tests/data/mocks';
import { mockLoadTodoParams } from '@/tests/domain/mocks';
import { throwError } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: DbLoadTodo;
  loadTodoRepositorySpy: LoadTodoRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadTodoRepositorySpy = new LoadTodoRepositorySpy();
  const sut = new DbLoadTodo(loadTodoRepositorySpy);

  return {
    sut,
    loadTodoRepositorySpy,
  };
};

describe('DbLoadTodo', () => {
  test('Should throw if LoadTodoRepositorySpy throws', async () => {
    const { sut, loadTodoRepositorySpy } = makeSut();
    jest.spyOn(loadTodoRepositorySpy, 'load').mockImplementationOnce(throwError);
    const promise = sut.load(mockLoadTodoParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return a todo if it succeeds', async () => {
    const { sut, loadTodoRepositorySpy } = makeSut();
    const response = await sut.load(mockLoadTodoParams());
    expect(response).toBe(loadTodoRepositorySpy.result);
  });
});
