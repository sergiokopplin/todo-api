import { EmailValidatorAdapter } from '@/infra/validators';
import { ValidationComposite, ValidationBuilder } from '@/validation/validators';

export const makeLoginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email(new EmailValidatorAdapter()).build(),
    ...ValidationBuilder.field('password').required().build(),
  ]);
