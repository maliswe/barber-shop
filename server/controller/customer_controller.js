const Customer = require('../schema/customer_schema.js')
const { fieldsMapper, recSkipper, sort } = require('./utilityMethod.js');
const bcrypt = require('bcryptjs');
const appointment = require('../schema/appointment_schema.js');

// Create new user
const create = async (req, res) => {
    try {

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new customer document based on the request body
        const newCustomer = new Customer({
            ...req.body,
            password: hashedPassword
        });

        // Save the new customer document to the database
        await newCustomer.save();

        // Send the saved customer data as a response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAll = async (req, res) => {
    try {
        sortFilter = sort(req.query.sort);
        const pageSize = Number(req.query.pageSize) || 10;

        // Validate before making a database call
        if (skip < 0 || pageSize < 0) {
            return res.status(400).json({ message: 'Invalid query parameters' });
        }

        recSkipper(req.query.page, req.query.pageSize);
        const customers = await Customer.find().skip(skip).limit(pageSize);

        if (customers.length < 1) {
            return res.status(404).json({ message: 'customer not found' });
        }

        // Send the data as a response to the client
        res.status(201).json(customers);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a customer account
const getOne = async (req, res) => {
    const id = req.params.id;
    try {
        // Use Mongoose to query the MongoDB database for customer data
        const customer = await Customer.findOne({ phone: id });

        if (!customer) {
            // If no customer with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'customer not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(customer);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update the custoemr info
const update = async (req, res) => {
    const id = req.params.id;
    try {
        // Find the customer by ID
        const customer = await Customer.findOne({ phone: id });

        if (!customer) {
            return res.status(404).json({ message: 'customer not found' });
        }

        // Define an array of field names that can be updated

        fieldsMapper(customer, req.body);

        // Save the updated customer document
        await customer.save();

        // Send the updated customer data as a response
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        // Use Mongoose to query the MongoDB database for customer data
        const result = await Customer.deleteOne({ phone: id });
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'customer not found' });
        }
        // Send the data as a response to the client
        res.status(200).json({ message: 'customer deleted' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove all the customers account
const removeAll = async (req, res) => {
    try {

        const count = await Customer.countDouments();

        if (count === 0) {
            return res.status(404).send({ message: 'No Customers found in the database.' });
        }

        await Customer.deleteMany();
        res.status.status(200).json({ message: 'Customers deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

const createAppointmentForCustomer = async (req, res) => {
    try {
        const customerId = req.params.customer_id;

        // Find the customer using the provided ID
        const customer = await Customer.findById(customerId);

        // If the customer doesn't exist, return an error
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        // Create a new appointment using the provided data
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();

        // Add the appointment's ID to the customer's appointments array
        customer.appointments.push(newAppointment._id);
        await customer.save();

        // Return the new appointment's data
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    removeAll,
    createAppointmentForCustomer
};