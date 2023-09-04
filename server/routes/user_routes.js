const express = require('express');
const router = express.Router();
const User = require('../schema/user_schema.js')

router.get('/', async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for user data
        const Users = await User.find(); // This fetches all user documents in the 'users' collection

        // Send the data as a response to the client
        res.json(Users);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    try {
        // Create a new user document based on the request body
        const newUser = new User(req.body);

        // Save the new user document to the database, store it in savedUser to get the assigned id
        const savedUser = await newUser.save();

        // Send the saved user data as a response
        res.status(201).json(savedUser); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;