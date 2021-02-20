import faker from 'faker'

import { SignUpController } from '@/presentation/controllers'
import { AddAccountSpy } from '@/tests/presentation/mocks'
import { ServerError, EmailInUseError } from '@/presentation/errors'
import { forbiddenError, serverError } from '@/presentation/helpers'

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
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(addAccountSpy)

  return {
    sut,
    addAccountSpy
  }
}

describe('SignUp Controller', () => {
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
