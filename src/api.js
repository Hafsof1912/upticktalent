let todos = [];
let currentId = Date.now();

export const delay = () => new Promise((res) => setTimeout(() => res(), 300));

const storedTodos = localStorage.getItem('todos');
if (storedTodos) {
  try {
    todos = JSON.parse(storedTodos);
    currentId = Math.max(...todos.map(todo => todo.id), currentId) + 1;
  } catch (error) {
    console.error('Failed to parse todos from localStorage', error);
  }
}

export async function getTodos() {
  await delay();
  return todos;
}

export async function addTodo(todo) {
  console.log(todo);
  await delay();
  if (Math.random() < 0.5) throw new Error('Failed to add new item!');
  todos = [...todos, { ...todo, id: currentId++ }];
  updateLocalStorage();
  return todos;
}

export async function updateTodo(updatedTodo) {
  await delay();
  todos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
  updateLocalStorage();
  return todos;
}

export async function deleteTodo(todoId) {
  await delay();
  todos = todos.filter((todo) => todo.id !== todoId);
  updateLocalStorage();
  return todos;
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}