import faker from 'faker'

import { LoadTodoController } from '@/presentation/controllers'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '@/presentation/errors'
import { badRequestError, ok, serverError } from '@/presentation/helpers'
import { LoadTodoSpy, ValidationSpy } from '@/tests/presentation/mocks'

const mockRequest = (): LoadTodoController.Request => {
  return {
    id: faker.random.uuid()
  }
}

interface SutTypes {
  sut: LoadTodoController
  validationSpy: ValidationSpy
  loadTodoSpy: LoadTodoSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadTodoSpy = new LoadTodoSpy()
  const sut = new LoadTodoController(validationSpy, loadTodoSpy)

  return {
    sut,
    validationSpy,
    loadTodoSpy
  }
}

describe('Load Todo Controller', () => {
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
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequestError(validationSpy.error))
  })

  test('Should throw if LoadTodo throws', async () => {
    const { sut, loadTodoSpy } = makeSut()
    jest.spyOn(loadTodoSpy, 'load').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call LoadTodo with correct params', async () => {
    const { sut, loadTodoSpy } = makeSut()
    const loadSpy = jest.spyOn(loadTodoSpy, 'load')
    const params = mockRequest()
    await sut.handle(params)
    expect(loadSpy).toHaveBeenLastCalledWith({
      id: params.id
    })
  })

  test('Should return 200 if ok', async () => {
    const { sut, loadTodoSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(loadTodoSpy.result))
  })
})
