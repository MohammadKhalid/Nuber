const Joi = require('joi');
const morgan = require('morgan');
const express = require('express');
const bookings = require('./routes/bookings');
const app = express();

// built-in middleware
app.use(express.json());
app.use(morgan('tiny'));

//routes
app.use('/api/bookings', bookings);

//base url
app.get('/', (req, res) => {
    res.send('Invalid url');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));