export const deleteTodoPath = {
  delete: {
    tags: ['todos'],
    security: [
      {
        apiKeyAuth: []
      }
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      204: {
        description: 'No Response'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
