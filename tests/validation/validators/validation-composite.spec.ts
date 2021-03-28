import { MissingParamError } from '@/presentation/errors';
import { ValidationSpy } from '@/tests/presentation/mocks';
import { ValidationComposite } from '@/validation/validators';

interface SutTypes {
  sut: ValidationComposite;
  validations: ValidationSpy[];
}

const makeSut = (): SutTypes => {
  const validations = [new ValidationSpy(), new ValidationSpy()];

  const sut = new ValidationComposite(validations);

  return {
    sut,
    validations,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validations } = makeSut();
    validations[0].error = new Error();
    expect(
      sut.validate({
        field: 'any_field',
      }),
    ).toEqual(validations[0].error);
  });

  test('Should return the very first error when invalid', () => {
    const { sut, validations } = makeSut();
    validations[1].error = new MissingParamError('field');
    expect(
      sut.validate({
        field: 'any_field',
      }),
    ).toEqual(validations[1].error);
  });

  test('Should return empty when validation is ok', () => {
    const { sut } = makeSut();
    expect(
      sut.validate({
        field: 'any_field',
      }),
    ).toBeFalsy();
  });
});
