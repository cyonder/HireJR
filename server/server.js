const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('./models/user');
require('./models/job');

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

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);
