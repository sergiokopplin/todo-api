import faker from 'faker'

import { DeleteTodoController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequestError } from '@/presentation/helpers'

const mockRequest = (): DeleteTodoController.Request => {
  return {
    id: faker.random.uuid()
  }
}

interface SutTypes {
  sut: DeleteTodoController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new DeleteTodoController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('Delete Todo Controller', () => {
  test('Should throw if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new InvalidParamError('id')
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

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.uuid())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequestError(validationSpy.error))
  })
})
