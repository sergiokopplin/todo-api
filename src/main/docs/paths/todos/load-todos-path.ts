export const loadTodosPath = {
  get: {
    tags: ['todos'],
    security: [
      {
        apiKeyAuth: []
      }
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/todos'
            }
          }
        }
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
