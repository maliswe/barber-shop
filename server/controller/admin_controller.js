const Admin = require('../schema/admin_schema.js')


const create = async (req, res) => {
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
}

const getAll = async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for admin data
        const admins = await Admin.find(); // This fetches all admin documents in the 'admins' collection
        
        if (admins.length < 1) {
            // If no admin with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Send the data as a response to the client
        res.json(admins);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for admin data
        const admin = await Admin.findOne({phone:id});

        if (!admin) {
            // If no admin with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Send the data as a response to the client
        res.json(admin);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res, id) => {
    try {
        // Find the admin by ID
        const admin = await Admin.findOne({phone:id});

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Define an array of field names that can be updated

        const fieldsToUpdate = Object.keys(admin.schema.paths)
            .filter((fieldName) => {
                const field = admin.schema.paths[fieldName];
                return field.isRequired && !field.options.hidden;
            });

        // Use a for loop to iterate through the fields and update them
        for (const field of fieldsToUpdate) {
            if (req.body[field]) {
                admin[field] = req.body[field];
            }
        }

        // Save the updated admin document
        await admin.save();

        // Send the updated admin data as a response
        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for admin data
        const result = await Admin.deleteOne({phone:id});
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'Admin not found' });
        }
        // Send the data as a response to the client
        res.json({ message: 'Admin deleted' });
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