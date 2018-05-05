require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

require('./models/user');
require('./models/candidate');
require('./models/employer');
require('./models/jobPost');
require('./models/jobApplication');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, (err, db) => {
    if(err){
        return console.log('Failed to establish connection with the database!');
    }
    console.log('Database connection established.');
});

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api', routes);

// All remaining requests return the react, so it can handle routing.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Express server is up and running!');
});