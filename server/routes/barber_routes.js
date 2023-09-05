const express = require('express');
const router = express.Router();
const barber = require('../schema/barber_schema.js')

router.get('/', async (req, res) => {

    try {
        // Use Mongoose to query the MongoDB database for barber data
        const Barber = await barber.find(); // This fetches all barber documents in the 'barber' collection
        res.json(Barber);
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
        const requiredFields = Object.keys(barber.schema.paths)
            .filter((fieldName) => {
                const field = barber.schema.paths[fieldName];
                return field.isRequired && !field.options.hidden;
            });

        const missingFields = [];
        requiredFields.forEach((field) => {
            if (!newBarber[field]) {
                missingFields.push(field);
            }
        });
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Required field(s) missing: ${missingFields.join(', ')}`,
            });
        }

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