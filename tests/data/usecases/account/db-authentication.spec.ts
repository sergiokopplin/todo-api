import { DbAuthentication } from '@/data/usecases'
import {
  LoadAccountByEmailRepositorySpy,
  HashComparerSpy,
  EncrypterSpy,
  UpdateAccessTokenRepositorySpy
} from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  )

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
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

  test('Should return null if comparison not valid', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const response = await sut.auth(mockAddAccountParams())
    expect(response).toBe(null)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Encrypter with correct params', async () => {
    const { sut, encrypterSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.auth(addAccountParams)
    expect(encrypterSpy.plaintext).toBe(addAccountParams.password)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest
      .spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken')
      .mockImplementationOnce(throwError)
    const promise = sut.auth(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccessTokenRepository with correct params', async () => {
    const {
      sut,
      updateAccessTokenRepositorySpy,
      loadAccountByEmailRepositorySpy,
      encrypterSpy
    } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.auth(addAccountParams)
    expect(updateAccessTokenRepositorySpy.id).toBe(
      loadAccountByEmailRepositorySpy.result.id
    )
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.result)
  })

  test('Should return correctly when ok', async () => {
    const {
      sut,
      updateAccessTokenRepositorySpy,
      loadAccountByEmailRepositorySpy
    } = makeSut()
    const result = await sut.auth(mockAddAccountParams())
    expect(result).toEqual({
      accessToken: updateAccessTokenRepositorySpy.token,
      name: loadAccountByEmailRepositorySpy.result.name
    })
  })
})
