import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import {
  CompareFieldsValidator,
  EmailValidator,
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(
    new CompareFieldsValidator('password', 'passwordConfirmation')
  )
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
