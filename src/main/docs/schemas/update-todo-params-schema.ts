export const updateTodoParamsSchema = {
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
    },
    id: {
      type: 'string'
    },
    completed: {
      type: 'boolean'
    }
  },
  required: ['id', 'completed', 'title', 'theme']
}
