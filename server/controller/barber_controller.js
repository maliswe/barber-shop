const Barber = require('../schema/barber_schema.js')
const { fieldsMapper } = require('./utilityMethod.js')
const { sort } = require('./utilityMethod.js')
const { recSkipper } = require('./utilityMethod.js')
const Service = require('../schema/services_schema.js')
const bcrypt = require('bcryptjs')


const create = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newBarber = new Barber({
            ...req.body,
            password: hashedPassword,
        });

        await newBarber.save();

        res.status(201).json({ message: 'Barber created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort)
        recSkipper(req.query.page, req.query.pageSize);
        const barbers = await Barber.find().skip(skip).limit(Number(req.query.pageSize));

        if (barbers.length < 1) {
            return res.status(404).json({ message: 'No Barber registered yet' });
        }
        res.status(200).json(barbers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    try {
        const barberId = req.params.id
        // Find the barber by using the phone number
        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }

        res.status(200).json(barber);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res) => {
    try {
        const barberId = req.params.id
         // Find the barber by phone
        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }

        fieldsMapper(barber, req.body);

        await barber.save();

        res.status(200).json({ message: 'Barber info updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const result = await Barber.deleteOne({ phone: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Barber not found' });
        }
        res.status(200).json({ message: 'Barber deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const removeAll = async (req, res) => {
    try {

        const count = await Barber.countDouments();

        if (count === 0) {
            return res.status(404).send({ message: 'No barbers found in the database.' });
        }

        await Barber.deleteMany();
        res.status.status(200).json({ message: 'Barbers deleted' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const setAvailability = async (req, res, next) => {
    try {
        const barberId = req.params.id;

        const { date, times } = req.body;

        const barber = await mongoose.model('Barber').findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availabilityIndex = barber.availability.findIndex(avail => avail.date.toISOString() === new Date(date).toISOString());

        if (availabilityIndex > -1) {
            barber.availability[availabilityIndex].times = times;
        } else {
            barber.availability.push({ date, times });
        }
        await barber.save();

        res.status(200).send({ message: 'Availability updated successfully.', availability: barber.availability });
    } catch (error) {
        res.status(500).send({ message: 'Error updating availability.', error: error.message });
    }
};

const getOneAvailability = async (req, res) => {
    try {
        const barberId = req.params.id;
        const targetDate = new Date(req.params.date);

        const barber = await mongoose.model('Barber').findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availability = barber.availability.find(avail => avail.date.toISOString() === targetDate.toISOString());

        if (!availability) {
            return res.status(200).send({ message: `No availability found for date: ${targetDate.toISOString()}` });
        }

        res.status(200).send(availability);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching availability.', error: error.message });
    }
};

const getAllAvailabilities = async (req, res) => {
    try {
        const barberId = req.params.id;

        const barber = await mongoose.model('Barber').findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        res.status(200).send(barber.availability);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching availabilities.', error: error.message });
    }
};

const deleteAvailability = async (req, res) => {
    try {
        const barberId = req.params.id;
        const { phone, date } = req.params;
        const targetDate = new Date(date);
        const barber = await mongoose.model('Barber').findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availabilityIndex = barber.availability.findIndex(avail => avail.date.toISOString() === targetDate.toISOString());

        if (availabilityIndex === -1) {
            return res.status(404).send({ message: `No availability found for date: ${targetDate.toISOString()}` });
        }

        barber.availability.splice(availabilityIndex, 1);
        await barber.save();

        res.status(200).send({ message: 'Availability deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting availability.', error: error.message });
    }
};

const deleteTimeSlot = async (req, res) => {
    try {
        const phone = req.params.phone;
        const targetDate = new Date(req.params.date);
        const timeToDelete = req.body.timeToDelete;

        const barber = await mongoose.model('Barber').findOne({ phone });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availability = barber.availability.find(avail => avail.date.toISOString() === targetDate.toISOString());

        if (!availability || !availability.times) {
            return res.status(404).send({ message: `No availability found for date: ${targetDate.toISOString()}` });
        }

        availability.times = availability.times.filter(time => time !== timeToDelete);

        await barber.save();

        res.status(200).send({ message: 'Time slot deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting time slot.', error: error.message });
    }
};




module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setAvailability,
    getOneAvailability,
    getAllAvailabilities,
    deleteAvailability,
    deleteTimeSlot
};