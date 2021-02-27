import jwt from 'jsonwebtoken'

import { JwtAdapter } from '@/infra/criptography'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token'
  }
}))

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')

  return {
    sut
  }
}

interface SutTypes {
  sut: JwtAdapter
}

describe('JwtAdapter', () => {
  describe('sign()', () => {
    test('Should call jwt with correct params', async () => {
      const { sut } = makeSut()
      const hashSpy = jest.spyOn(jwt, 'sign')
      await sut.sign('any_id')
      expect(hashSpy).toHaveBeenCalledWith(
        {
          id: 'any_id'
        },
        'secret'
      )
    })

    test('Should return an id on success', async () => {
      const { sut } = makeSut()
      const result = await sut.sign('any_id')
      expect(result).toBe('any_token')
    })
  })
})
