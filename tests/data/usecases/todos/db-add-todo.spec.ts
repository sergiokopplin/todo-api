import { DbAddTodo } from '@/data/usecases';
import { AddTodoRepositorySpy } from '@/tests/data/mocks';
import { mockAddTodoParams } from '@/tests/domain/mocks';
import { throwError } from '@/tests/presentation/mocks';

interface SutTypes {
  sut: DbAddTodo;
  addTodoRepositorySpy: AddTodoRepositorySpy;
}

const makeSut = (): SutTypes => {
  const addTodoRepositorySpy = new AddTodoRepositorySpy();
  const sut = new DbAddTodo(addTodoRepositorySpy);

  return {
    sut,
    addTodoRepositorySpy,
  };
};

describe('DbAddTodo', () => {
  test('Should throw if AddTodoRepositorySpy throws', async () => {
    const { sut, addTodoRepositorySpy } = makeSut();
    jest.spyOn(addTodoRepositorySpy, 'add').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddTodoParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddTodoRepositorySpy with correct params', async () => {
    const { sut, addTodoRepositorySpy } = makeSut();
    const addAccountParams = mockAddTodoParams();
    await sut.add(addAccountParams);
    expect(addTodoRepositorySpy.title).toBe(addAccountParams.title);
    expect(addTodoRepositorySpy.dueDate).toBe(addAccountParams.dueDate);
  });

  test('Should return an todo if it succeeds', async () => {
    const { sut, addTodoRepositorySpy } = makeSut();
    const addAccountParams = mockAddTodoParams();
    const response = await sut.add(addAccountParams);
    expect(response).toBe(addTodoRepositorySpy.result);
  });
});
