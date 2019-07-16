const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

mongoose.connect(`mongodb://localhost/playground`)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to mongodb'))
app.use(express.json());
app.use('/api/users', users); // authentication & autorization
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));