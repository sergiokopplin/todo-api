import faker from 'faker'

import { RequiredFieldValidator } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'

const field = faker.internet.email()

interface SutTypes {
  sut: RequiredFieldValidator
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidator('email')

  return {
    sut
  }
}

describe('RequiredFieldValidator', () => {
  test('Should return an error if validation fails', () => {
    const { sut } = makeSut()
    expect(sut.validate({ invalidField: field })).toEqual(new MissingParamError('email'))
  })
})
