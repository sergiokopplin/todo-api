import faker from 'faker'

import { AddTodoController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequestError } from '@/presentation/helpers'

const mockRequest = (): AddTodoController.Request => {
  return {
    title: faker.random.words(3)
  }
}

interface SutTypes {
  sut: AddTodoController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddTodoController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('AddTodo Controller', () => {
  test('Should throw if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new InvalidParamError('title')
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
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequestError(validationSpy.error))
  })
})
