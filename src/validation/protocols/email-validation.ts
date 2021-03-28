export interface EmailValidation {
  validate: (email: string) => boolean;
}

export namespace EmailValidation {
  export type email = string;
  export type result = boolean;
}
