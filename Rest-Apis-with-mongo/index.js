const express = require('express');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')

mongoose.connect(`mongodb://localhost/playground`)
// mongoose.connect(`mongodb://localhost/genres`)
// mongoose.connect(`mongodb://localhost/customers`)
.then(()=>console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb'))
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));