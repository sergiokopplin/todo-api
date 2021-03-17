import {
  EmailValidatorAdapter,
  ObjectIdValidatorAdapter,
  PasswordStrengthValidatorAdapter
} from '@/infra/validators'
import {
  ValidationBuilder as sut,
  RequiredFieldValidator,
  EmailValidator,
  MinLengthValidator,
  CompareFieldsValidator,
  ObjectIdValidator,
  PasswordStrengthValidator
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

  test('Should return ObjectIdValidator', () => {
    const field = faker.database.column()
    const validations = sut
      .field(field)
      .objectId(new ObjectIdValidatorAdapter())
      .build()

    expect(validations).toEqual([
      new ObjectIdValidator(field, new ObjectIdValidatorAdapter())
    ])
  })

  test('Should return PasswordStrengthValidator', () => {
    const field = faker.database.column()
    const validations = sut
      .field(field)
      .password(new PasswordStrengthValidatorAdapter())
      .build()

    expect(validations).toEqual([
      new PasswordStrengthValidator(
        field,
        new PasswordStrengthValidatorAdapter()
      )
    ])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const fieldToCompare = faker.database.column()

    const validations = sut
      .field(field)
      .required()
      .min(length)
      .sameAs(fieldToCompare)
      .email(new EmailValidatorAdapter())
      .objectId(new ObjectIdValidatorAdapter())
      .password(new PasswordStrengthValidatorAdapter())
      .build()

    expect(validations).toEqual([
      new RequiredFieldValidator(field),
      new MinLengthValidator(field, length),
      new CompareFieldsValidator(field, fieldToCompare),
      new EmailValidator(field, new EmailValidatorAdapter()),
      new ObjectIdValidator(field, new ObjectIdValidatorAdapter()),
      new PasswordStrengthValidator(
        field,
        new PasswordStrengthValidatorAdapter()
      )
    ])
  })
})
