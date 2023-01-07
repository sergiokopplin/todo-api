import { faker } from '@faker-js/faker';

import { UpdateTodoController } from '@/presentation/controllers';
import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors';
import { badRequestError, notFoundError, ok, serverError } from '@/presentation/helpers';
import { ValidationSpy, UpdateTodoSpy } from '@/tests/presentation/mocks';

const mockRequest = (): UpdateTodoController.Request => {
  return {
    id: faker.datatype.uuid(),
    title: faker.random.words(3),
    completed: true,
  };
};

interface SutTypes {
  sut: UpdateTodoController;
  validationSpy: ValidationSpy;
  updateTodoSpy: UpdateTodoSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const updateTodoSpy = new UpdateTodoSpy();
  const sut = new UpdateTodoController(validationSpy, updateTodoSpy);

  return {
    sut,
    validationSpy,
    updateTodoSpy,
  };
};

describe('Add Todo Controller', () => {
  test('Should throw if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new InvalidParamError('title');
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(badRequestError(validationSpy.error));
  });

  test('Should call Validation correctly', async () => {
    const { sut, validationSpy } = makeSut();
    const validateSpy = jest.spyOn(validationSpy, 'validate');
    const request = mockRequest();
    await sut.handle(request);
    expect(validateSpy).toHaveBeenCalledWith(request);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError(faker.random.word());
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequestError(validationSpy.error));
  });

  test('Should throw if UpdateTodo throws', async () => {
    const { sut, updateTodoSpy } = makeSut();
    jest.spyOn(updateTodoSpy, 'update').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null));
    });
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new ServerError(null)));
  });

  test('Should call UpdateTodo with correct params', async () => {
    const { sut, updateTodoSpy } = makeSut();
    const addSpy = jest.spyOn(updateTodoSpy, 'update');
    const request = mockRequest();
    await sut.handle(request);
    expect(addSpy).toHaveBeenCalledWith(request);
  });

  test('Should return 404 if no existing todo', async () => {
    const { sut, updateTodoSpy } = makeSut();
    updateTodoSpy.result = null;
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(notFoundError());
  });

  test('Should return 200 if ok', async () => {
    const { sut, updateTodoSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(updateTodoSpy.result));
  });
});
