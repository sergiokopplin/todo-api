import { DbAuthentication } from '@/data/usecases'
import {
  LoadAccountByEmailRepositorySpy,
  HashComparerSpy
} from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy
  )

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy
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

  test('Should call LoadAccountByEmailRepositorySpy with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.auth(addAccountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  test('Should return null if account not exists', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const response = await sut.auth(mockAddAccountParams())
    expect(response).toBe(null)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call HashComparer with correct params', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.auth(addAccountParams)
    expect(hashComparerSpy.digest).toBe(
      loadAccountByEmailRepositorySpy.result.password
    )
    expect(hashComparerSpy.plaintext).toBe(addAccountParams.password)
  })
})
