const { generateId } = require('./id');

const todos = new Map();

function persistTodo(todo) {
  const id = generateId();
  const record = {
    id,
    title: todo.title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.set(id, record);
  return record;
}

function findTodoById(id) {
  const todo = todos.get(id);
  if (!todo) {
    throw new Error('Todo not found');
  }
  return todo;
}

function updateTodoInStore(id, updates) {
  const existing = findTodoById(id);
  const updated = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  todos.set(id, updated);
  return updated;
}

function removeTodoFromStore(id) {
  const existing = findTodoById(id);
  todos.delete(id);
  return existing;
}

function listTodosFromStore() {
  return Array.from(todos.values());
}

module.exports = {
  persistTodo,
  findTodoById,
  updateTodoInStore,
  removeTodoFromStore,
  listTodosFromStore,
};
