import { Validation } from '@/presentation/protocols'
import { PasswordStrengthError } from '@/presentation/errors'
import { PasswordStrengthValidation } from '@/validation/protocols'

export class PasswordStrengthValidator implements Validation {
  constructor(
    private readonly field: string,
    private readonly passwordStrengthValidation: PasswordStrengthValidation
  ) {}

  validate(input: any): Error {
    if (input[this.field]) {
      if (!this.passwordStrengthValidation.validate(input[this.field])) {
        return new PasswordStrengthError()
      }
    }
  }
}
