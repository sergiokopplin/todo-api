import { makeSignupValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator,
  CompareFieldsValidator,
  EmailValidator
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidator(field))
    }
    validations.push(
      new CompareFieldsValidator('password', 'passwordConfirmation')
    )
    validations.push(new EmailValidator('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
