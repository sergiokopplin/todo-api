import { makeLoadTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator,
  ObjectIdValidator
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { ObjectIdValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoadTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadTodoValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidator(field))
    }
    validations.push(
      new ObjectIdValidator('id', new ObjectIdValidatorAdapter())
    )
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
