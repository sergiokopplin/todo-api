export const updateTodoPath = {
  put: {
    tags: ['todos'],
    security: [
      {
        apiKeyAuth: []
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateTodoParams'
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/todo'
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
