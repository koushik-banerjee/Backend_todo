const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/get', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: true }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        res.json(deletedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

app.post('/add', async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = await TodoModel.create({ task });
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
