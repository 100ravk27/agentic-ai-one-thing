function validateCreateTodo(body) {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid body');
  }
  const title = body.title;
  if (title === undefined || title === null) {
    throw new Error('title is required');
  }
  if (typeof title !== 'string') {
    throw new Error('title must be a string');
  }
  return body;
}

function validateUpdateTodo(body) {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid body');
  }
  // At least one updatable field
  const { title, completed } = body;
  if (title !== undefined && typeof title !== 'string') {
    throw new Error('title must be a string');
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    throw new Error('completed must be a boolean');
  }
  if (title === undefined && completed === undefined) {
    throw new Error('Provide title and/or completed');
  }
  return body;
}

function validateTodoId(id) {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid todo id');
  }
  return id;
}

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
};
