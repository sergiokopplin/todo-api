export interface DateValidation {
  validate: (date: Date) => boolean;
}

export namespace DateValidation {
  export type date = Date;
  export type result = boolean;
}
