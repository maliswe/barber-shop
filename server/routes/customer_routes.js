const express = require('express');
const router = express.Router();
const customer = require('../schema/user_schema.js')

router.get('/', async (req, res) => {

    try {
        // Use Mongoose to query the MongoDB database for customer data
        const Customer = await customer.find({ role: 'customer' }); // This fetches all customer documents in the 'customers' collection
        res.json(Customer);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    try {
        // Create a new customer document based on the request body
        const newCustomer = new customer(req.body);

        // Save the new customer document to the database, store it in savedCustomer to get the assigned id
        const savedCustomer = await newCustomer.save();

        // Send the saved customer data as a response
        res.status(201).json(savedCustomer); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;