const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const tasks = require('./routes/tasks');
const tasks = require('./backend/routes/tasks')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/ToDoApp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/api', tasks);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});