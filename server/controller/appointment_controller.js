const moment = require('moment');
const Appointment = require('../schema/appointment_schema.js');
const Customer = require('../schema/customer_schema.js');
const Barber = require('../schema/barber_schema.js');
const { fieldsMapper, generator } = require('./utilityMethod.js');


// Get all the appointment
const getAllAppointment = async (req, res, customerID = undefined) => {
    try {
        let query = {};
        if (customerID !== undefined) {
            query = { customer: customerID }
        }
        const appointments = await Appointment.find(query);

        if (appointments.length < 1) {
            return res.status(404).json({ message: 'appointment not found' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
// Get an appointment
const getAppointment = async (req, res, confNumber, customerID = undefined) => {
    try {

        let query = {};
        if (customerID !== undefined) {
            query = { customer: customerID }
        };

        const appointment = await Appointment.findOne({ confNumber: confNumber, ...query });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Create an appointment 
const createAppointment = async (req, res, customerID = undefined) => {
    try {
        let customId = await generator();

        req.body['confNumber'] = customId;

        // Used for create appointment from the customer route
        if (customerID !== undefined) {
            req.body['customer'] = customerID;
        }

        // Create the appointment
        const newAppointment = new Appointment(req.body);

        const updatedCustomer = await Customer.findOneAndUpdate(
            { phone: req.body['customer'] },
            { $push: { appointments: newAppointment.confNumber } }
        );

        const updatedBarber = await Barber.findOneAndUpdate(
            { phone: req.body['barber'] },
            { $push: { appointments: newAppointment.confNumber } }
        );

        const savedAppointment = await newAppointment.save();
        res.status(201).json({ savedAppointment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const updateAppointment = async (req, res, confNumber) => {
    try {
        const appointment = await Appointment.findOne({ confNumber: confNumber });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = req.body.status;
        await appointment.save();

        res.status(200).json({ message: 'Appointment status updated successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// remove an appointment
const remove = async (req, res, confNumber) => {
    try {
        const result = await Appointment.deleteOne({ confNumber: confNumber });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a specific service for an appointment
const getAppointmentService = async (req, res, confNumber, serviceId) => {
    try {
        const appointment = await Appointment.findOne({ confNumber: confNumber }).populate('service');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Filter the services to get the specific one
        const service = appointment.service.find(s => s._id.toString() === serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found for the given appointment' });
        }

        res.status(200).json(service);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Remove a specific service from an appointment
const deleteServiceFromAppointment = async (req, res, confNumber, serviceId) => {
    try {
        const appointment = await Appointment.findOne({ confNumber: confNumber });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check if the service exists in the appointment
        const serviceIndex = appointment.service.findIndex(s => s.toString() === serviceId);

        if (serviceIndex === -1) {
            return res.status(404).json({ message: 'Service not found for the given appointment' });
        }

        // Remove the service from the appointment's services
        appointment.service.splice(serviceIndex, 1);

        // Save the appointment with the service removed
        await appointment.save();

        res.status(200).json({ message: 'Service removed from the appointment' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


module.exports = {
    getAllAppointment,
    getAppointment,
    createAppointment,
    updateAppointment,
    remove,
    getAppointmentService,
    deleteServiceFromAppointment
}