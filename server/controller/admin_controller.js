const Admin = require('../schema/admin_schema.js')
const { fieldsMapper, sort, recSkipper } = require('./utilityMethod.js');
const bcrypt = require('bcryptjs');

// Create a new admin account
const create = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        const newAdmin = new Admin({
            ...req.body,
            password: hashPass
        });

        const savedAdmin = await newAdmin.save();

        res.status(201).json(savedAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all the admins accounts
const getAll = async (req, res) => {
    try {
        sortFilter = sort(req.query.sort)
        const pageSize = Number(req.query.pageSize) || 10;
        recSkipper(req.query.page, req.query.pageSize);
        const admins = await Admin.find().skip(skip).limit(pageSize);

        if (admins.length < 1) {
            return res.status(404).json({ message: 'admin not found' });
        }

        if (skip < 0 || pageSize < 0) {
            return res.status(400).json({ message: 'Invalid query parameters' });
        }


        // Add HATEOAS links for each admin
        const adminsWithLinks = admins.map(admin => ({
            ...admin._doc,
            links: [
                {
                    rel: 'self',
                    href: `api/v1/admins/${admin.phone}`,
                    type: 'GET'
                },
                {
                    rel: 'update',
                    href: `api/v1/admins/${admin.phone}`,
                    type: 'PUT'
                },
                {
                    rel: 'delete',
                    href: `api/v1/admins/${admin.phone}`,
                    type: 'DELETE'
                }
            ]
        }));

        res.status(201).json(adminsWithLinks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Get the admin accocunt
const getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findOne({ phone: id });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const links = [
            {
                rel: 'self',
                href: 'api/v1/admins/' + id,
                type: 'PUT'
            },
            {
                rel: 'self',
                href: 'api/v1/admins/' + id,
                type: 'DELETE'
            }
        ]
        res.status(200).json({ ...admin._doc, links });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update admin information
const update = async (req, res) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findOne({ phone: id });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        fieldsMapper(admin, req.body);

        await admin.save();

        // Send the updated admin data as a response
        res.status(200).json({ message: 'Information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete the admin account
const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Admin.deleteOne({ phone: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const removeAll = async (req, res) => {
    try {

        const count = await Admin.countDouments();

        if (count === 0) {
            return res.status(404).send({ message: 'No Admins found in the database.' });
        }

        await Admin.deleteMany();
        res.status.status(200).json({ message: 'Admins deleted' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const methodDispatch = async (req, res, id) => {
    methodType = req.headers['_method']
    try {
        if (methodType === 'PUT') {
            update(req, res, id);
        } else if (methodType === 'DELETE') {
            remove(req, res, id);
        } else {
            res.status(400).json({ message: 'Only PUT or DELETE methods are accepted' });
        }
    } catch {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    removeAll,
    methodDispatch
};

//Module for Admin-related actions and routes.
//This module provides functions for creating, retrieving, updating, and deleting admin profiles.
