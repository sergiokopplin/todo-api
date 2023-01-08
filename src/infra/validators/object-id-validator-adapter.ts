import { ObjectId } from 'mongodb'

import { ObjectIdValidation } from '@/validation/protocols'

export class ObjectIdValidatorAdapter implements ObjectIdValidation {
  validate (id: string): boolean {
    return ObjectId.isValid(id)
  }
}
