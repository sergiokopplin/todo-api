import { makeAddTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddTodoValidation()
    const validations: Validation[] = []
    for (const field of ['title']) {
      validations.push(new RequiredFieldValidator(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
