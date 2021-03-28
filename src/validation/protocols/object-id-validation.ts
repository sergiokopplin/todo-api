export interface ObjectIdValidation {
  validate: (id: string) => boolean;
}

export namespace ObjectIdValidation {
  export type id = string;
  export type result = boolean;
}
