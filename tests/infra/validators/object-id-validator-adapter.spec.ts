import mongodb from 'mongodb'

import { ObjectIdValidatorAdapter } from '@/infra/validators'

jest.mock('mongodb', () => ({
  ObjectId: {
    isValid (): boolean {
      return true
    }
  }
}))

const makeSut = (): ObjectIdValidatorAdapter => {
  return new ObjectIdValidatorAdapter()
}

describe('ObjectIdValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(mongodb.ObjectId, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.validate('invalid_id')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.validate('valid_id')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(mongodb.ObjectId, 'isValid')
    sut.validate('valid_id')
    expect(isValidSpy).toHaveBeenCalledWith('valid_id')
  })
})
