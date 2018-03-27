const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./routes');

require('./models/user');
require('./models/candidate');
require('./models/employer');
require('./models/jobPost');
require('./models/jobApplication');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HireJR', (err, db) => {
    if(err){
        return console.log('Failed to establish connection with the database!');
    }
    console.log('Database connection established.');
});

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);
