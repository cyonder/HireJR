const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./models/Job');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HireJR', (err, db) => {
    if(err){
        return console.log('Failed to establish connection with the database!');
    }
    console.log('Database connection established.');
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
