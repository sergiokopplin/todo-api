export const deleteCompletedTodosPath = {
  delete: {
    security: [
      {
        apiKeyAuth: []
      }
    ],
    responses: {
      204: {
        description: 'No Response'
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
