const express = require('express');
const {
  createTodoFlow,
  updateTodoFlow,
  listTodosFlow,
  deleteTodoFlow,
} = require('../utils/todoFlows');
const store = require('../utils/store');

const router = express.Router();

// GET /api/todos — nested flow: fetch -> sort -> format
router.get('/', (req, res) => {
  try {
    const result = listTodosFlow();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/todos/:id — simple
router.get('/:id', (req, res) => {
  try {
    const todo = store.findTodoById(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(err.message === 'Todo not found' ? 404 : 400).json({ error: err.message });
  }
});

// POST /api/todos — nested flow: validate -> sanitize -> persist
router.post('/', (req, res) => {
  try {
    const todo = createTodoFlow(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/todos/:id — nested flow: validate -> sanitize -> merge -> save
router.patch('/:id', (req, res) => {
  try {
    const todo = updateTodoFlow(req.params.id, req.body);
    res.json(todo);
  } catch (err) {
    const status = err.message === 'Todo not found' ? 404 : 400;
    res.status(status).json({ error: err.message });
  }
});

// DELETE /api/todos/:id — nested flow: validate id -> find -> remove
router.delete('/:id', (req, res) => {
  try {
    const removed = deleteTodoFlow(req.params.id);
    res.json({ deleted: removed });
  } catch (err) {
    const status = err.message === 'Todo not found' ? 404 : 400;
    res.status(status).json({ error: err.message });
  }
});

module.exports = router;
