import { ValidationComposite } from '@/validation/validators'
import { ValidationSpy } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: ValidationComposite
  validations: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validations = [
    new ValidationSpy(),
    new ValidationSpy()
  ]

  const sut = new ValidationComposite(validations)

  return {
    sut,
    validations
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validations } = makeSut()
    validations[0].error = new Error()
    expect(sut.validate({
      field: 'any_field'
    })).toEqual(validations[0].error)
  })
})
