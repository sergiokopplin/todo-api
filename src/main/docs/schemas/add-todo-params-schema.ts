export const addTodoParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    theme: {
      type: 'string'
    },
    dueDate: {
      type: 'string'
    }
  },
  required: ['title']
}
