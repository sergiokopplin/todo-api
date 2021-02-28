import faker from 'faker'

import { LoginController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { InvalidParamError } from '@/presentation/errors'
import { badRequestError } from '@/presentation/helpers'

const mockRequest = (): LoginController.Request => {
  const password = faker.internet.password()
  return {
    email: faker.internet.email(),
    password
  }
}

interface SutTypes {
  sut: LoginController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('Login Controller', () => {
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
})
