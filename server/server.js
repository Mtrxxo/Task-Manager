require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Tasks = require('./model/model');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

const MONGO_URL = process.env.MONGO_DB_URI;
const PORT = process.env.PORT;

mongoose.connect(MONGO_URL).then(console.log('Mongoose is connected'));

//CREATE
app.post('/api/tasks', async (req, res) => {
    const { input } = req.body;
    console.log(req.body)

    const task = new Tasks({task: input, complete: false})
    const saved = await task.save();
    res.json(saved);
});

//READ
app.get('/api/tasks', async (req, res) => {
    const response = await Tasks.find()

    res.json(response);
});

//UPDATE
app.patch('/api/tasks/:id', async (req, res) => {
    const updated = await Tasks.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});

    res.json(updated)
});

//DELETE
app.delete('/api/tasks/:id', async (req, res) => {
    await Tasks.findByIdAndDelete(req.params.id);

    res.json({message: 'Task deleted successfully!'});
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});