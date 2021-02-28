import { PasswordStrengthValidation } from '@/validation/protocols'

export class PasswordStrengthValidationSpy
  implements PasswordStrengthValidation {
  password: PasswordStrengthValidation.password
  result = true

  validate(password: string): boolean {
    this.password = password
    return this.result
  }
}
