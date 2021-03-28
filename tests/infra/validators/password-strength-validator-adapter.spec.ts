import validator from 'validator';

import { PasswordStrengthValidatorAdapter } from '@/infra/validators';

jest.mock('validator', () => ({
  isStrongPassword(): boolean {
    return true;
  },
}));

const makeSut = (): PasswordStrengthValidatorAdapter => {
  return new PasswordStrengthValidatorAdapter();
};

const options = {
  minLowercase: 0,
  minNumbers: 0,
  minSymbols: 0,
  minUppercase: 0,
};

describe('PasswordStrengthValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isStrongPassword').mockReturnValueOnce(false);
    const isValid = sut.validate('any_password');
    expect(isValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const sut = makeSut();
    const isValid = sut.validate('any_password');
    expect(isValid).toBe(true);
  });

  test('Should call validator with correct email', () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isStrongPassword');
    sut.validate('any_password');
    expect(isEmailSpy).toHaveBeenCalledWith('any_password', options);
  });
});
