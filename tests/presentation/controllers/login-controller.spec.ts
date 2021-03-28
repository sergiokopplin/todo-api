import faker from 'faker';

import { LoginController } from '@/presentation/controllers';
import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors';
import { badRequestError, ok, serverError, unauthorized } from '@/presentation/helpers';
import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks';

const mockRequest = (): LoginController.Request => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

interface SutTypes {
  sut: LoginController;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const sut = new LoginController(validationSpy, authenticationSpy);

  return {
    sut,
    validationSpy,
    authenticationSpy,
  };
};

describe('Login Controller', () => {
  test('Should throw if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new InvalidParamError('email');
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

  test('Should throw if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null));
    });
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new ServerError(null)));
  });

  test('Should call Authentication with correct params', async () => {
    const { sut, authenticationSpy } = makeSut();
    const authSpy = jest.spyOn(authenticationSpy, 'auth');
    const request = mockRequest();
    await sut.handle(request);
    expect(authSpy).toHaveBeenCalledWith(request);
  });

  test('Should return unauthorized when Authentication returns invalid', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(null);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(unauthorized());
  });

  test('Should return 200 if ok', async () => {
    const { sut, authenticationSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(authenticationSpy.result));
  });
});
