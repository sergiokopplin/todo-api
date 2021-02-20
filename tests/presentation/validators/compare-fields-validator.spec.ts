import faker from 'faker'

import { CompareFieldsValidator } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = faker.internet.email()

describe('RequiredFieldValidator', () => {
  test('Should return an error if validation fails', () => {
    const sut = new CompareFieldsValidator('field', 'fieldToCompare')
    expect(sut.validate({ field: field, fieldToCompare: 'invalid' })).toEqual(new InvalidParamError('field'))
  })
})
