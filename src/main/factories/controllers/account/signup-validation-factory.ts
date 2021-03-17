import {
  EmailValidatorAdapter,
  PasswordStrengthValidatorAdapter
} from '@/infra/validators'
import { ValidationComposite, ValidationBuilder } from '@/validation/validators'

export const makeSignupValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('email')
      .required()
      .email(new EmailValidatorAdapter())
      .build(),
    ...ValidationBuilder.field('password')
      .required()
      .password(new PasswordStrengthValidatorAdapter())
      .build(),
    ...ValidationBuilder.field('passwordConfirmation')
      .required()
      .password(new PasswordStrengthValidatorAdapter())
      .sameAs('password')
      .build()
  ])
