import { DbAddAccount } from '@/data/usecases/account'
import {
  CheckAccountByEmailRepositorySpy,
  HasherSpy,
  AddAccountRepositorySpy
} from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
  )

  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  test('Should throw if CheckAccountByEmailRepository throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      .mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  test('Should return false if account already exists', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const addAccountParams = mockAddAccountParams()
    const response = await sut.add(addAccountParams)
    expect(response).toBe(false)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Hasher with correct values', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest
      .spyOn(addAccountRepositorySpy, 'add')
      .mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct params', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(addAccountRepositorySpy.account).toEqual({
      ...addAccountParams,
      password: hasherSpy.result
    })
  })

  test('Should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = false
    const addAccountParams = mockAddAccountParams()
    const response = await sut.add(addAccountParams)
    expect(response).toBe(false)
  })

  test('Should return true if ok', async () => {
    const { sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const response = await sut.add(addAccountParams)
    expect(response).toBe(true)
  })
})
