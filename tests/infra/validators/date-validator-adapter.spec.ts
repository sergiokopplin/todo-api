import validator from 'validator';

import { DateValidatorAdapter } from '@/infra/validators';

jest.mock('validator', () => ({
  isISO8601(): boolean {
    return true;
  },
}));

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter();
};

describe('DateValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isISO8601').mockReturnValueOnce(false);
    const result = sut.validate(new Date());
    expect(result).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const sut = makeSut();
    const result = sut.validate(new Date());
    expect(result).toBe(true);
  });

  test('Should call validator with correct date', () => {
    const sut = makeSut();
    const isISO8601Spy = jest.spyOn(validator, 'isISO8601');
    const date = new Date();
    sut.validate(date);
    expect(isISO8601Spy).toHaveBeenCalledWith(date.toString());
  });
});
