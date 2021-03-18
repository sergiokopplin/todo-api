import faker from 'faker'

import { ObjectIdValidator } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { ObjectIdValidationSpy } from '@/tests/validation/mocks'

interface SutTypes {
  sut: ObjectIdValidator
  objectIdValidationSpy: ObjectIdValidationSpy
}

const makeSut = (): SutTypes => {
  const objectIdValidationSpy = new ObjectIdValidationSpy()
  const sut = new ObjectIdValidator('id', objectIdValidationSpy)

  return {
    sut,
    objectIdValidationSpy
  }
}

describe('ObjectIdValidator', () => {
  test('Should return an error if validation fails', () => {
    const { sut, objectIdValidationSpy } = makeSut()
    objectIdValidationSpy.result = false
    expect(sut.validate({ id: 'invalid_id' })).toEqual(
      new InvalidParamError('id')
    )
  })

  test('Should return empty if validation is ok', () => {
    const { sut } = makeSut()
    expect(sut.validate({ id: faker.random.uuid() })).toBeFalsy()
  })

  test('Should return empty validation if optional', () => {
    const { sut } = makeSut()
    expect(sut.validate({})).toBeFalsy()
  })
})
