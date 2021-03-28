export class EmailInUseError extends Error {
  constructor() {
    super('The received e-mail is already in use');
    this.name = 'EmailInUseError';
  }
}
