import { Validation } from '@/presentation/protocols'
import {
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

export const makeLoadTodoValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidator(field))
  }
  return new ValidationComposite(validations)
}
