import {
  EmailValidatorAdapter,
  PasswordStrengthValidatorAdapter
} from '@/infra/validators'
import { makeSignupValidation } from '@/main/factories'
import {
  CompareFieldsValidator,
  EmailValidator,
  PasswordStrengthValidator,
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('name'),
        new RequiredFieldValidator('email'),
        new EmailValidator('email', new EmailValidatorAdapter()),
        new RequiredFieldValidator('password'),
        new PasswordStrengthValidator(
          'password',
          new PasswordStrengthValidatorAdapter()
        ),
        new RequiredFieldValidator('passwordConfirmation'),
        new PasswordStrengthValidator(
          'passwordConfirmation',
          new PasswordStrengthValidatorAdapter()
        ),
        new CompareFieldsValidator('passwordConfirmation', 'password')
      ])
    )
  })
})
