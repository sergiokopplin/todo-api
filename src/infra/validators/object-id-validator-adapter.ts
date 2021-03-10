import { ObjectIdValidation } from '@/validation/protocols'

import { ObjectId } from 'mongodb'

export class ObjectIdValidatorAdapter implements ObjectIdValidation {
  validate(id: string): boolean {
    return ObjectId.isValid(id)
  }
}
