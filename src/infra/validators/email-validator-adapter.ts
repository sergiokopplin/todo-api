import validator from 'validator';

import { EmailValidation } from '@/validation/protocols';

export class EmailValidatorAdapter implements EmailValidation {
  validate(email: string): boolean {
    return validator.isEmail(email);
  }
}
