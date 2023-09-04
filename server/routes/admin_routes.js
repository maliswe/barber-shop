const express = require('express');
const router = express.Router();
const Admin = require('../schema/user_schema.js')

router.get('/', async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for admin data
        const admins = await Admin.find({ role: 'admin' }); // This fetches all admin documents in the 'admins' collection

        // Send the data as a response to the client
        res.json(admins);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    try {
        // Create a new admin document based on the request body
        const newAdmin = new Admin(req.body);

        // Save the new admin document to the database
        const savedAdmin = await newAdmin.save();

        // Send the saved admin data as a response
        res.status(201).json(savedAdmin); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;