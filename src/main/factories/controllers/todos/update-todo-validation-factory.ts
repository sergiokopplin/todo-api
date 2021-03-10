import { ObjectIdValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import {
  ObjectIdValidator,
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

export const makeUpdateTodoValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'title', 'completed']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new ObjectIdValidator('id', new ObjectIdValidatorAdapter()))
  return new ValidationComposite(validations)
}
