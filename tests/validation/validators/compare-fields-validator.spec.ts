import { faker } from '@faker-js/faker';

import { InvalidParamError } from '@/presentation/errors';
import { CompareFieldsValidator } from '@/validation/validators';

const field = faker.internet.email();

interface SutTypes {
  sut: CompareFieldsValidator;
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidator('field', 'fieldToCompare');

  return {
    sut,
  };
};

describe('RequiredFieldValidator', () => {
  test('Should return an error if validation fails', () => {
    const sut = new CompareFieldsValidator('field', 'fieldToCompare');
    expect(sut.validate({ field: field, fieldToCompare: 'invalid' })).toEqual(
      new InvalidParamError('field'),
    );
  });

  test('Should return empty validation is ok', () => {
    const { sut } = makeSut();
    expect(sut.validate({ field: field, fieldToCompare: field })).toBeFalsy();
  });

  test('Should return empty validation if optional', () => {
    const { sut } = makeSut();
    expect(sut.validate({})).toBeFalsy();
  });
});
