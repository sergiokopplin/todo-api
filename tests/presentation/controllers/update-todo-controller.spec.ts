import faker from 'faker'

import { UpdateTodoController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequestError } from '@/presentation/helpers'

const mockRequest = (): UpdateTodoController.Request => {
  return {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: true
  }
}

interface SutTypes {
  sut: UpdateTodoController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new UpdateTodoController(validationSpy)

  return {
    sut,
    validationSpy
  }
}

describe('Add Todo Controller', () => {
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
