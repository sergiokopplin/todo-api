import faker from 'faker'

import { SignUpController } from '@/presentation/controllers'
import { AddAccountSpy, ValidationSpy } from '@/tests/presentation/mocks'
import {
  ServerError,
  EmailInUseError,
  InvalidParamError
} from '@/presentation/errors'
import {
  badRequestError,
  forbiddenError,
  serverError
} from '@/presentation/helpers'

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

interface SutTypes {
  sut: SignUpController
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(validationSpy, addAccountSpy)

  return {
    sut,
    validationSpy,
    addAccountSpy
  }
}

describe('SignUp Controller', () => {
  test('Should throw if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new InvalidParamError('email')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequestError(validationSpy.error))
  })

  test('Should call Validation correctly', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  test('Should throw if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddAccount with correct params', async () => {
    const { sut, addAccountSpy } = makeSut()
    const addSpy = jest.spyOn(addAccountSpy, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith(addAccountSpy.params)
  })

  test('Should return 403 when account exists', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = false
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbiddenError(new EmailInUseError()))
  })
})
