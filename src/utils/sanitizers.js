function sanitizeTodoInput(body) {
  const title = (body.title ?? '').trim().slice(0, 500);
  if (!title) {
    throw new Error('title cannot be empty after sanitization');
  }
  return { title };
}

function sanitizeUpdateInput(body) {
  const out = {};
  if (body.title !== undefined) {
    out.title = String(body.title).trim().slice(0, 500);
  }
  if (body.completed !== undefined) {
    out.completed = Boolean(body.completed);
  }
  return out;
}

module.exports = {
  sanitizeTodoInput,
  sanitizeUpdateInput,
};
