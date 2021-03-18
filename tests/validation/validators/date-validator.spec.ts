import { DateValidator } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { DateValidationSpy } from '@/tests/validation/mocks'

interface SutTypes {
  sut: DateValidator
  dateValidationSpy: DateValidationSpy
}

const makeSut = (): SutTypes => {
  const dateValidationSpy = new DateValidationSpy()
  const sut = new DateValidator('date', dateValidationSpy)

  return {
    sut,
    dateValidationSpy
  }
}

describe('DateValidator', () => {
  test('Should return an error if validation fails', () => {
    const { sut, dateValidationSpy } = makeSut()
    dateValidationSpy.result = false
    expect(sut.validate({ date: 'invalid_date' })).toEqual(
      new InvalidParamError('date')
    )
  })

  test('Should return empty if validation is ok', () => {
    const { sut } = makeSut()
    expect(sut.validate({ date: 'valid_date' })).toBeFalsy()
  })
})
