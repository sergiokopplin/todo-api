import { DbUpdateTodo } from '@/data/usecases'
import { UpdateTodoRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateTodoParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DbUpdateTodo
  updateTodoRepositorySpy: UpdateTodoRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateTodoRepositorySpy = new UpdateTodoRepositorySpy()
  const sut = new DbUpdateTodo(updateTodoRepositorySpy)

  return {
    sut,
    updateTodoRepositorySpy
  }
}

describe('DbUpdateTodo', () => {
  test('Should throw if UpdateTodoRepositorySpy throws', async () => {
    const { sut, updateTodoRepositorySpy } = makeSut()
    jest.spyOn(updateTodoRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateTodoParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateTodoRepositorySpy with correct params', async () => {
    const { sut, updateTodoRepositorySpy } = makeSut()
    const updateAccountParams = mockUpdateTodoParams()
    await sut.update(updateAccountParams)
    expect(updateTodoRepositorySpy.params).toBe(updateAccountParams)
  })

  test('Should return an todo if it succeeds', async () => {
    const { sut, updateTodoRepositorySpy } = makeSut()
    const updateAccountParams = mockUpdateTodoParams()
    const response = await sut.update(updateAccountParams)
    expect(response).toBe(updateTodoRepositorySpy.result)
  })
})
