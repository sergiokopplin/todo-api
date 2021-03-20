export const addTodoPath = {
  '/todos': {
    post: {
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
              $ref: '#/schemas/addTodoParams'
            }
          }
        }
      },
      responses: {
        201: {
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
}
