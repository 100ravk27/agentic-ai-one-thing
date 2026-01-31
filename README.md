# Todo API — Express Node.js Server

Todo application with routes in `src/routes/` and shared logic in `src/utils/`. Three APIs use nested function flows (validate → sanitize → persist, etc.).

## Structure

```
src/
  index.js          # App entry, mounts routes
  routes/
    health.js       # GET /api/health
    todos.js        # Todo CRUD under /api/todos
  utils/
    id.js           # Generate todo ids
    validators.js   # validateCreateTodo, validateUpdateTodo, validateTodoId
    sanitizers.js   # sanitizeTodoInput, sanitizeUpdateInput
    store.js        # In-memory todo store (persist, find, update, remove, list)
    todoFlows.js    # Nested flows: createTodoFlow, updateTodoFlow, listTodosFlow, deleteTodoFlow
```

## APIs

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/todos` | List todos (flow: fetch → sort → format) |
| GET | `/api/todos/:id` | Get one todo |
| POST | `/api/todos` | Create todo (flow: validate → sanitize → persist) |
| PATCH | `/api/todos/:id` | Update todo (flow: validate → sanitize → merge → save) |
| DELETE | `/api/todos/:id` | Delete todo (flow: validate id → find → remove) |

## Run

```bash
npm install
npm start
```

Dev with auto-reload: `npm run dev`

## Examples

```bash
# Health
curl http://localhost:3000/api/health

# List todos
curl http://localhost:3000/api/todos

# Create todo
curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"title":"Buy milk"}'

# Get todo (use id from create response)
curl http://localhost:3000/api/todos/todo_1234567890_abc123

# Update todo (partial: title and/or completed)
curl -X PATCH http://localhost:3000/api/todos/todo_1234567890_abc123 -H "Content-Type: application/json" -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/todo_1234567890_abc123
```
