import faker from 'faker'

import { DeleteTodoController } from '@/presentation/controllers'
import { ValidationSpy, DeleteTodoSpy } from '@/tests/presentation/mocks'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '@/presentation/errors'
import { badRequestError, noContent, serverError } from '@/presentation/helpers'

const mockRequest = (): DeleteTodoController.Request => {
  return {
    id: faker.random.uuid()
  }
}

interface SutTypes {
  sut: DeleteTodoController
  validationSpy: ValidationSpy
  deleteTodoSpy: DeleteTodoSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const deleteTodoSpy = new DeleteTodoSpy()
  const sut = new DeleteTodoController(validationSpy, deleteTodoSpy)

  return {
    sut,
    validationSpy,
    deleteTodoSpy
  }
}

describe('DeleteTodo Controller', () => {
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

  test('Should throw if DeleteTodo throws', async () => {
    const { sut, deleteTodoSpy } = makeSut()
    jest.spyOn(deleteTodoSpy, 'delete').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call DeleteTodo with correct params', async () => {
    const { sut, deleteTodoSpy } = makeSut()
    const deleteSpy = jest.spyOn(deleteTodoSpy, 'delete')
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 204 when ok', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const result = await sut.handle(request)
    expect(result).toEqual(noContent())
  })
})
