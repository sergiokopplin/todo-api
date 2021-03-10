import { makeLoadTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('LoadTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadTodoValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidator(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
