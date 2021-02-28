import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import {
  EmailValidator,
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
