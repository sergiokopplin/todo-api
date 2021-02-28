import faker from 'faker'

import { PasswordStrengthValidator } from '@/validation/validators'
import { PasswordStrengthError } from '@/presentation/errors'
import { PasswordStrengthValidationSpy } from '@/tests/validation/mocks'

interface SutTypes {
  sut: PasswordStrengthValidator
  passwordStrengthValidationSpy: PasswordStrengthValidationSpy
}

const makeSut = (): SutTypes => {
  const passwordStrengthValidationSpy = new PasswordStrengthValidationSpy()
  const sut = new PasswordStrengthValidator(
    'password',
    passwordStrengthValidationSpy
  )

  return {
    sut,
    passwordStrengthValidationSpy
  }
}

describe('PasswordStrengthValidator', () => {
  test('Should return an error if validation fails', () => {
    const { sut, passwordStrengthValidationSpy } = makeSut()
    passwordStrengthValidationSpy.result = false
    expect(sut.validate({ password: 'any_password' })).toEqual(
      new PasswordStrengthError()
    )
  })

  test('Should return empty if validation is ok', () => {
    const { sut } = makeSut()
    expect(sut.validate({ password: faker.internet.password() })).toBeFalsy()
  })
})
