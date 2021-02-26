import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)

  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAuthentication', () => {
  test('Should throw if LoadAccountByEmailRepositorySpy throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
      .mockImplementationOnce(throwError)
    const promise = sut.auth(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })
})
