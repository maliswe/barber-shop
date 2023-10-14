const Customer = require('../schema/customer_schema.js')
const { fieldsMapper, recSkipper, sort } = require('./utilityMethod.js');
const bcrypt = require('bcryptjs');


const create = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newCustomer = new Customer({
            ...req.body,
            password: hashedPassword
        });

        await newCustomer.save();

        res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort)
        recSkipper(req.query.page, req.query.pageSize);
        const customers = await Customer.find().skip(skip).limit(Number(req.query.pageSize));

        if (customers.length < 1) {
            return res.status(404).json({ message: 'customer not found' });
        }

        res.status(201).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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

const update = async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await Customer.findOne({ phone: id });

        if (!customer) {
            return res.status(404).json({ message: 'customer not found' });
        }
        fieldsMapper(customer, req.body);
        await customer.save();
        res.status(200).json({ message: 'User updated'});
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

const removeAll = async (req, res) => {
    try{

        const count = await Customer.countDouments();

        if (count === 0) {
            return res.status(404).send({ message: 'No Customers found in the database.' });
        }

        await Customer.deleteMany();
        res.status.status(200).json({ message: 'Customers deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    removeAll
};

//Module for managing customers.
//This module provides functions for creating, retrieving, updating, and deleting customers.