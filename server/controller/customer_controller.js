const Customer = require('../schema/customer_schema.js')
const { fieldsMapper } = require('./utilityMethod.js'); // adjust the path accordingly if the file is in a different directory


const create = async (req, res) => {
    try {
        // Create a new customer document based on the request body
        const newCustomer = new Customer(req.body);

        // Save the new customer document to the database
        const savedCustomer = await newCustomer.save();

        // Send the saved customer data as a response
        res.status(201).json(savedCustomer); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for customer data
        const customers = await Customer.find(); // This fetches all customer documents in the 'customers' collection

        if (customers.length < 1) {
            return res.status(404).json({ message: 'customer not found' });
        }

        // Send the data as a response to the client
        res.json(customers);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for customer data
        const customer = await Customer.findOne({ phone: id });

        if (!customer) {
            // If no customer with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'customer not found' });
        }

        // Send the data as a response to the client
        res.json(customer);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res, id) => {
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
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for customer data
        const result = await Customer.deleteOne({ phone: id });
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'customer not found' });
        }
        // Send the data as a response to the client
        res.json({ message: 'customer deleted' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};