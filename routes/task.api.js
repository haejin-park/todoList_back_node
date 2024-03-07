const express = require('express');
const taskController = require('../controllers/task.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();
router.post('/', authController.authenticate, taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', taskController.putTask);
router.delete('/:id', taskController.deleteTask);
module.exports = router;

