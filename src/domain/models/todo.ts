type Theme = 'blank' | 'red' | 'yellow'

export interface Todo {
  id: string
  title: string
  completed: boolean
  dueDate: Date
  theme: Theme
}
