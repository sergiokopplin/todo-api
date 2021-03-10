import { ObjectIdValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import {
  ObjectIdValidator,
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

export const makeLoadTodoValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new ObjectIdValidator('id', new ObjectIdValidatorAdapter()))
  return new ValidationComposite(validations)
}
