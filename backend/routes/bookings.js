const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/nuber')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    carType: String,
    status: String,
    date: { type: Date, default:Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

//Get all bookings
router.get('/', async (req, res) => {
    const bookings = await Booking.find().sort('date');
    res.send(bookings);
});

//Get booking by id
router.get('/:id', async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    //if not found then return
    if (!booking) return res.status(404).send('booking not found');

    //else send course details
    res.send(booking);
});

//Create new bookings
router.post('/', async (req, res) => {
    //validate booking existance and length
    const { error } = bookingValidation(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    //if valid then
    const booking = new Booking({
        name: req.body.name,
        email: req.body.email,
        carType: req.body.carType,
        status: 'pending'
    });

    const result = await booking.save();
    res.send(result);
});

//Cancel existing booking
router.put('/cancel/:id', async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    //if not found then return
    if (!booking) return res.status(404).send('booking not found');

    //if found then change status
    booking.status = 'cancel';

    //save and send response
    const result = await booking.save();
    res.send(result);
});

//Accept existing booking
router.put('/accept/:id', async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    //if not found then return
    if (!booking) return res.status(404).send('booking not found');

    //if found then change status
    booking.status = 'accepted';

    //save and send response
    const result = await booking.save();
    res.send(result);
});

function bookingValidation(booking){
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        carType: Joi.string().min(3).required(),
        status: Joi.string().min(3)
    };

    return Joi.validate(booking);
};


module.exports = router;