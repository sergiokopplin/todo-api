import { DateValidatorAdapter, ObjectIdValidatorAdapter } from '@/infra/validators'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeUpdateTodoValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('id').required().objectId(new ObjectIdValidatorAdapter()).build(),
    ...ValidationBuilder.field('title').required().min(3).build(),
    ...ValidationBuilder.field('completed').required().build(),
    ...ValidationBuilder.field('dueDate').date(new DateValidatorAdapter()).build()
  ])
