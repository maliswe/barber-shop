const Admin = require('../schema/admin_schema.js')
const { fieldsMapper, sort, recSkipper } = require('./utilityMethod.js');
const bcrypt = require('bcryptjs');


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
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort)
        recSkipper(req.query.page, req.query.pageSize);
        const admins = await Admin.find().skip(skip).limit(Number(req.query.pageSize));

        if (admins.length < 1) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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

const update = async (req, res) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findOne({ phone: id });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        fieldsMapper(admin, req.body);

        await admin.save();

        res.status(200).json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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
    methodDispatch
};

//Module for Admin-related actions and routes.
//This module provides functions for creating, retrieving, updating, and deleting admin profiles.