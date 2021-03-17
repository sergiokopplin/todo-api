import { Validation } from '@/presentation/protocols'
import {
  RequiredFieldValidator,
  EmailValidator,
  MinLengthValidator,
  CompareFieldsValidator
} from '@/validation/validators'
import {
  EmailValidation,
  ObjectIdValidation,
  PasswordStrengthValidation
} from '@/validation/protocols'
import { ObjectIdValidator } from './object-id-validator'
import { PasswordStrengthValidator } from './password-strength-validator'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: Validation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidator(this.fieldName))
    return this
  }

  email(validatorAdapter: EmailValidation): ValidationBuilder {
    this.validations.push(new EmailValidator(this.fieldName, validatorAdapter))
    return this
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidator(this.fieldName, length))
    return this
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidator(this.fieldName, fieldToCompare)
    )
    return this
  }

  objectId(validatorAdapter: ObjectIdValidation): ValidationBuilder {
    this.validations.push(
      new ObjectIdValidator(this.fieldName, validatorAdapter)
    )
    return this
  }

  password(validatorAdapter: PasswordStrengthValidation): ValidationBuilder {
    this.validations.push(
      new PasswordStrengthValidator(this.fieldName, validatorAdapter)
    )
    return this
  }

  build(): Validation[] {
    return this.validations
  }
}
