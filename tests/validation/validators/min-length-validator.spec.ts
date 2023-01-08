import { faker } from '@faker-js/faker'

import { InvalidParamError } from '@/presentation/errors'
import { MinLengthValidator } from '@/validation/validators'

const field = faker.internet.email()

interface SutTypes {
  sut: MinLengthValidator
}

const makeSut = (): SutTypes => {
  const sut = new MinLengthValidator('field', 3)

  return {
    sut
  }
}

describe('MinLengthValidator', () => {
  test('Should return an error if validation fails', () => {
    const sut = new MinLengthValidator('field', 30)
    expect(sut.validate({ field })).toEqual(new InvalidParamError('field'))
  })

  test('Should return empty validation if is ok', () => {
    const { sut } = makeSut()
    expect(sut.validate({ field })).toBeFalsy()
  })

  test('Should return empty validation if optional', () => {
    const { sut } = makeSut()
    expect(sut.validate({})).toBeFalsy()
  })
})
