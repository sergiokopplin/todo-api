import { Validation } from '@/presentation/protocols'
import {
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

export const makeUpdateTodoValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'title', 'completed']) {
    validations.push(new RequiredFieldValidator(field))
  }
  return new ValidationComposite(validations)
}
