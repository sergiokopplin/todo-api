import { Validation } from '@/presentation/protocols'
import {
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

export const makeAddTodoValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title']) {
    validations.push(new RequiredFieldValidator(field))
  }
  return new ValidationComposite(validations)
}
