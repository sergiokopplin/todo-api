export interface PasswordStrengthValidation {
  validate: (password: string) => boolean;
}

export namespace PasswordStrengthValidation {
  export type password = string;
  export type result = boolean;
}
