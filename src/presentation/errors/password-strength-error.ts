export class PasswordStrengthError extends Error {
  constructor() {
    super(`Invalid password, it must have 8 characters minimum`);
    this.name = 'PasswordStrengthError';
  }
}
