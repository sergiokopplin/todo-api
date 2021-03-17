import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeAddTodoValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('title').required().min(3).build()
  ])
