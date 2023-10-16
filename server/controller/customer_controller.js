const Customer = require('../schema/customer_schema.js')
const { fieldsMapper, recSkipper, sort } = require('./utilityMethod.js');
const bcrypt = require('bcryptjs');
const Appointment = require('../schema/appointment_schema.js');

// Create new user
const create = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newCustomer = new Customer({
            ...req.body,
            password: hashedPassword
        });

        await newCustomer.save();

        // Send the saved customer data as a response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
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

        res.status(201).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a customer account
const getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await Customer.findOne({ phone: id });

        if (!customer) {
            return res.status(404).json({ message: 'customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update the custoemr info
const update = async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await Customer.findOne({ phone: id });

        if (!customer) {
            return res.status(404).json({ message: 'customer not found' });
        }
        fieldsMapper(customer, req.body);
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
        const result = await Customer.deleteOne({ phone: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'customer not found' });
        }
        res.status(200).json({ message: 'customer deleted' });
    } catch (error) {
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