import faker from 'faker'

import { SignUpController } from '@/presentation/controllers'
import { AddAccountSpy } from '@/tests/presentation/mocks'

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
  test('Should call AddAccount with correct params', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result).toBe(null)
  })
})
