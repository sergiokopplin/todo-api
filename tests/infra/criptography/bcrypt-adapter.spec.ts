import bcrypt from 'bcrypt'
import faker from 'faker'

import { BcryptAdapter } from '@/infra/criptography'

interface SutTypes {
  sut: BcryptAdapter
}

const salt = 12

const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(salt)

  return {
    sut
  }
}

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call bcrypt with correct params', async () => {
      const { sut } = makeSut()
      const password = faker.internet.password()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(password)
      expect(hashSpy).toHaveBeenCalledWith(password, salt)
    })

    test('Should return an id on success', async () => {
      const { sut } = makeSut()
      const uuid = faker.random.uuid()
      const password = faker.internet.password()
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementationOnce(async () => await Promise.resolve(uuid))
      const result = await sut.hash(password)
      expect(result).toBe(uuid)
    })
  })

  describe('compare()', () => {
    test('Should call bcrypt compare with correct params', async () => {
      const { sut } = makeSut()
      const password = faker.internet.password()
      const otherPassword = faker.internet.password()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(password, otherPassword)
      expect(compareSpy).toHaveBeenCalledWith(password, otherPassword)
    })

    test('Should return false when invalid', async () => {
      const { sut } = makeSut()
      const password = faker.internet.password()
      const otherPassword = faker.internet.password()
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(async () => await Promise.resolve(false))
      const result = await sut.compare(password, otherPassword)
      expect(result).toBe(false)
    })
  })
})
