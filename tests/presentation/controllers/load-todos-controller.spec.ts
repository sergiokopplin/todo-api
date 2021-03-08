import { LoadTodosController } from '@/presentation/controllers'
import { ServerError } from '@/presentation/errors'
import { ok, serverError } from '@/presentation/helpers'
import { LoadTodosSpy } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: LoadTodosController
  loadTodosSpy: LoadTodosSpy
}

const makeSut = (): SutTypes => {
  const loadTodosSpy = new LoadTodosSpy()
  const sut = new LoadTodosController(loadTodosSpy)

  return {
    sut,
    loadTodosSpy
  }
}

describe('Load Todos Controller', () => {
  test('Should throw if LoadTodos throws', async () => {
    const { sut, loadTodosSpy } = makeSut()
    jest.spyOn(loadTodosSpy, 'loadAll').mockImplementationOnce(async () => {
      return await Promise.reject(new ServerError(null))
    })
    const response = await sut.handle()
    expect(response).toEqual(serverError(new ServerError(null)))
  })

  test('Should call LoadTodos with correct params', async () => {
    const { sut, loadTodosSpy } = makeSut()
    const loadAllSpy = jest.spyOn(loadTodosSpy, 'loadAll')
    await sut.handle()
    expect(loadAllSpy).toHaveBeenLastCalledWith()
  })

  test('Should return 200 if ok', async () => {
    const { sut, loadTodosSpy } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(ok(loadTodosSpy.result))
  })
})
