const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new task
router.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).send('Task title is required');
    }
    try {
        const task = new Task({ title, description });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        if (task.completed && req.body.completed) {
            return res.status(400).send('Task is already completed');
        }
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
