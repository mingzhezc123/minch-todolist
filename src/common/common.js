export let filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}
const STORAGE_KEY = 'todos'

export let todoStorage = {
  fetch() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch (err) {
      return []
    }
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export let visibility = location.hash.substr(location.hash.indexOf('/') + 1) === '' ? 'all' : location.hash.substr(location.hash.indexOf('/') + 1)