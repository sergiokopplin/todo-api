import { DbAddAccount } from '@/data/usecases/account'
import { CheckAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

interface SutTypes {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy)

  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount', () => {
  test('Should call CheckAccountByEmailRepositorySpy with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })
})
