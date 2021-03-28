import validator from 'validator';

import { PasswordStrengthValidation } from '@/validation/protocols';

export class PasswordStrengthValidatorAdapter implements PasswordStrengthValidation {
  validate(password: string): boolean {
    return validator.isStrongPassword(password, {
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    });
  }
}
