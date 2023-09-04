const express = require('express');
const router = express.Router();
const services = require('../schema/services_schema.js')

router.get('/', async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for servicesdata
        const services = await services.find(); // This fetches all services documents in the 'services' collection

        // Send the data as a response to the client
        res.json(services);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    try {
        // Create a new services document based on the request body
        const newServices = new Services(req.body);

        // Save the new services document to the database
        const savedServices = await newServices.save();

        // Send the saved services data as a response
        res.status(201).json(savedServices); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;