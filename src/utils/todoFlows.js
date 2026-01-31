/**
 * Nested function flows for todo APIs.
 */

const validators = require('./validators');
const sanitizers = require('./sanitizers');
const store = require('./store');

// Create: validate -> sanitize -> persist
function createTodoFlow(body) {
  const validated = validators.validateCreateTodo(body);
  const sanitized = sanitizers.sanitizeTodoInput(validated);
  return store.persistTodo(sanitized);
}

// Update: validate -> sanitize -> merge -> save
function mergeUpdates(existing, updates) {
  return {
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.completed !== undefined && { completed: updates.completed }),
  };
}

function updateTodoFlow(id, body) {
  const validatedId = validators.validateTodoId(id);
  const validatedBody = validators.validateUpdateTodo(body);
  const sanitized = sanitizers.sanitizeUpdateInput(validatedBody);
  const merged = mergeUpdates(store.findTodoById(validatedId), sanitized);
  return store.updateTodoInStore(validatedId, merged);
}

// List: fetch -> sort -> format
function sortByCreated(todosList) {
  return [...todosList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

function formatListResponse(todosList) {
  return {
    count: todosList.length,
    todos: todosList,
  };
}

function listTodosFlow() {
  const raw = store.listTodosFromStore();
  const sorted = sortByCreated(raw);
  return formatListResponse(sorted);
}

// Delete: validate id -> find -> remove
function deleteTodoFlow(id) {
  const validatedId = validators.validateTodoId(id);
  const found = store.findTodoById(validatedId);
  store.removeTodoFromStore(validatedId);
  return found;
}

module.exports = {
  createTodoFlow,
  updateTodoFlow,
  listTodosFlow,
  deleteTodoFlow,
};
