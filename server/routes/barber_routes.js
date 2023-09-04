const express = require('express');
const router = express.Router();
const barber = require('../schema/user_schema.js')

router.get('/', async (req, res) => {

    try {
        // Use Mongoose to query the MongoDB database for barber data
        const barber = await barber.find({ role: 'barber' }); // This fetches all barber documents in the 'barber' collection
        res.json(barber);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    try {
        // Create a new barber document based on the request body
        const newBarber = new barber(req.body);

        // Save the new barber document to the database, store it in savedbarber to get the assigned id
        const savedBarber = await newBarber.save();

        // Send the saved barber data as a response
        res.status(201).json(savedBarber); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;