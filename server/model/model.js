const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task: {type: String, required: true},
    complete: {type: Boolean, required: true}
})

module.exports = new mongoose.model('Task', taskSchema);