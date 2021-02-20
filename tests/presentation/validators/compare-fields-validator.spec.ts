import faker from 'faker'

import { CompareFieldsValidator } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = faker.internet.email()

interface SutTypes {
  sut: CompareFieldsValidator
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidator('field', 'fieldToCompare')

  return {
    sut
  }
}

describe('RequiredFieldValidator', () => {
  test('Should return an error if validation fails', () => {
    const sut = new CompareFieldsValidator('field', 'fieldToCompare')
    expect(sut.validate({ field: field, fieldToCompare: 'invalid' })).toEqual(new InvalidParamError('field'))
  })

  test('Should return empty validation is ok', () => {
    const { sut } = makeSut()
    expect(sut.validate({ field: field, fieldToCompare: field })).toBeFalsy()
  })
})
