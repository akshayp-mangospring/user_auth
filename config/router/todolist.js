const express = require('express');
const router = express.Router();

// Get All Todo Lists
router.get('/', (r, w) => {
  w.send({
    success: false,
    message: 'Todo Lists are gonna be retrieved after you add the model and the migration...',
  });
});

// Create a Todo List
router.post('/', (r, w) => {
  w.send({
    success: false,
    message: 'Todo List is gonna be created after you add the model and the migration...',
  });
});

module.exports = router;
