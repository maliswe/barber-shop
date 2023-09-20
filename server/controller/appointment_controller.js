const moment = require('moment');
const Appointment = require('../schema/appointment_schema.js');
const Generator = require('../mongodbService/confNumberGenerator.js');
const Customer = require('../schema/customer_schema.js');
const Barber = require('../schema/barber_schema.js');
const Service = require('../schema/services_schema.js');
const { fieldsMapper } = require('./utilityMethod.js');



const getAllAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find();

        if (appointments.length < 1) {
            return res.status(404).json({ message: 'appointment not found' });
        }

        res.json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const getAppointment = async (req, res, confNumber) => {
    try {

        const appointment = await Appointment.findOne({ confNumber: confNumber });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const createAppointment = async (req, res) => {
    try {
        let customId = await Generator.generator();
        const currentDate = moment().format('YYYY-MM-DD');

        req.body['date'] = currentDate;
        req.body['confNumber'] = customId;

        // Verify if customer exists
        const customer = await Customer.findOne({ phone: req.body['customer'] });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        const barber = await Barber.findOne({ phone: req.body['barber'] });
        if (!barber) {
            return res.status(404).json({ message: 'barber not found' });
        }
        const service = await Service.findOne({ _id: req.body['service'] });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Create the appointment
        const newAppointment = new Appointment(req.body);

        // Update the Customer appointments
        const updatedCustomer = await Customer.findOneAndUpdate(
            { phone: req.body['customer'] },
            { $push: { appointments: newAppointment.confNumber } }
        );

        // Update the Barber appointments
        const updatedBarber = await Barber.findOneAndUpdate(
            { phone: req.body['barber'] },
            { $push: { appointments: newAppointment.confNumber } }
        );

        // save the appointment and send it back
        const savedAppointment = await newAppointment.save();
        res.status(201).json({ savedAppointment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

//Update the appointment status
const updateAppointment = async (req, res, confNumber) => {
    try {

        const appointment = await Appointment.findOne({ confNumber: confNumber });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (req.body.hasOwnProperty('status')) {
            const allowedStatusValues = ['Scheduled', 'Completed', 'Cancelled'];
            if (!allowedStatusValues.includes(req.body.status)) {
                return res.status(400).json({ message: 'Invalid status value' });
            }
        }


        fieldsMapper(appointment, req.body)

        res.json(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const remove = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for Appointment data
        const result = await Appointment.deleteOne({ phone: id });
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'Appointment not found' });
        }
        // Send the data as a response to the client
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    getAllAppointment,
    getAppointment,
    createAppointment,
    updateAppointment,
    remove
}