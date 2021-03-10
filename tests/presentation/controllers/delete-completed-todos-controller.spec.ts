import { DeleteCompletedTodosController } from '@/presentation/controllers'
import { DeleteCompletedTodosSpy } from '@/tests/presentation/mocks'
import { ServerError } from '@/presentation/errors'
import { noResult, serverError } from '@/presentation/helpers'

interface SutTypes {
  sut: DeleteCompletedTodosController
  deleteCompletedTodosSpy: DeleteCompletedTodosSpy
}

const makeSut = (): SutTypes => {
  const deleteCompletedTodosSpy = new DeleteCompletedTodosSpy()
  const sut = new DeleteCompletedTodosController(deleteCompletedTodosSpy)

  return {
    sut,
    deleteCompletedTodosSpy
  }
}

describe('DeleteCompletedTodos Controller', () => {
  test('Should throw if DeleteCompletedTodos throws', async () => {
    const { sut, deleteCompletedTodosSpy } = makeSut()
    jest
      .spyOn(deleteCompletedTodosSpy, 'delete')
      .mockImplementationOnce(async () => {
        return await Promise.reject(new ServerError(null))
      })
    const response = await sut.handle()
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call DeleteTodo with correct params', async () => {
    const { sut, deleteCompletedTodosSpy } = makeSut()
    const deleteSpy = jest.spyOn(deleteCompletedTodosSpy, 'delete')
    await sut.handle()
    expect(deleteSpy).toHaveBeenCalledWith()
  })

  test('Should return 204 when ok', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(noResult())
  })
})
