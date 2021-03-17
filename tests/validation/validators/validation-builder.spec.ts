import { EmailValidatorAdapter } from '@/infra/validators'
import {
  ValidationBuilder as sut,
  RequiredFieldValidator,
  EmailValidator,
  MinLengthValidator,
  CompareFieldsValidator
} from '@/validation/validators'

import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidator', () => {
    const field = faker.database.column()

    const validations = sut.field(field).required().build()

    expect(validations).toEqual([new RequiredFieldValidator(field)])
  })

  test('Should return EmailValidator', () => {
    const field = faker.database.column()
    const validations = sut
      .field(field)
      .email(new EmailValidatorAdapter())
      .build()

    expect(validations).toEqual([
      new EmailValidator(field, new EmailValidatorAdapter())
    ])
  })

  test('Should return MinLengthValidator', () => {
    const field = faker.database.column()
    const length = faker.random.number()

    const validations = sut.field(field).min(length).build()

    expect(validations).toEqual([new MinLengthValidator(field, length)])
  })

  test('Should return CompareFieldsValidator', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const validations = sut.field(field).sameAs(fieldToCompare).build()

    expect(validations).toEqual([
      new CompareFieldsValidator(field, fieldToCompare)
    ])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()

    const validations = sut
      .field(field)
      .required()
      .min(length)
      .email(new EmailValidatorAdapter())
      .build()

    expect(validations).toEqual([
      new RequiredFieldValidator(field),
      new MinLengthValidator(field, length),
      new EmailValidator(field, new EmailValidatorAdapter())
    ])
  })
})
