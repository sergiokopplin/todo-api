import { DateValidatorAdapter } from '@/infra/validators'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeAddTodoValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('accountId').required().build(),
    ...ValidationBuilder.field('title').required().min(3).build(),
    ...ValidationBuilder.field('dueDate')
      .date(new DateValidatorAdapter())
      .build()
  ])
