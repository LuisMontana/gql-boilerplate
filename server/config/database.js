const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/GQL-Boilerplate';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'));
mongoose.connection.on('error', error => console.error(error));