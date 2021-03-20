import faker from 'faker'

import { AddTodoController } from '@/presentation/controllers'
import { AddTodoSpy, ValidationSpy } from '@/tests/presentation/mocks'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '@/presentation/errors'
import { badRequestError, created, serverError } from '@/presentation/helpers'

const mockRequest = (): AddTodoController.Request => {
  return {
    title: faker.random.words(3),
    dueDate: new Date(),
    theme: 'blank'
  }
}

interface SutTypes {
  sut: AddTodoController
  validationSpy: ValidationSpy
  addTodoSpy: AddTodoSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addTodoSpy = new AddTodoSpy()
  const sut = new AddTodoController(validationSpy, addTodoSpy)

  return {
    sut,
    validationSpy,
    addTodoSpy
  }
}

describe('Add Todo Controller', () => {
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

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequestError(validationSpy.error))
  })

  test('Should throw if AddTodo throws', async () => {
    const { sut, addTodoSpy } = makeSut()
    jest.spyOn(addTodoSpy, 'add').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddTodo with correct params', async () => {
    const { sut, addTodoSpy } = makeSut()
    const addSpy = jest.spyOn(addTodoSpy, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 200 if ok', async () => {
    const { sut, addTodoSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(created(addTodoSpy.result))
  })
})
