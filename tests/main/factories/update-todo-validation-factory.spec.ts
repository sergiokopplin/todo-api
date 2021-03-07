import { makeUpdateTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('UpdateTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateTodoValidation()
    const validations: Validation[] = []
    for (const field of ['id', 'title', 'completed']) {
      validations.push(new RequiredFieldValidator(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
