export const todosSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      dueDate: {
        type: 'string'
      },
      completed: {
        type: 'boolean'
      },
      theme: {
        type: 'string'
      }
    },
    required: ['id', 'title', 'theme', 'completed']
  }
}
