const moment = require('moment');
const Appointment = require('../schema/appointment_schema.js');
const Customer = require('../schema/customer_schema.js');
const Barber = require('../schema/barber_schema.js');
const Service = require('../schema/services_schema.js');
const { fieldsMapper, generator, confNumberChecker} = require('./utilityMethod.js');



const getAllAppointment = async (req, res, customerID = undefined) => {
    try {
        let query = {};
        if ( customerID !== undefined ){
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

const getAppointment = async (req, res, confNumber, customerID = undefined) => {
    try {

        let query = {};
        if ( customerID !== undefined ){
            query = {customer: customerID}
        };

        const appointment = await Appointment.findOne({ confNumber: confNumber, ...query});

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const createAppointment = async (req, res, customerID = undefined) => {
    try {
        let customId = await generator();

        req.body['confNumber'] = customId;

        // Used for create appointment from the customer route
        if (customerID !== undefined){
            req.body['customer'] = customerID;
        }

        // Verify if customer exists
        /*const customer = await Customer.findOne({ phone: req.body['customer'] });
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
        }*/

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

        fieldsMapper(appointment, req.body);
        await appointment.save();

        res.status(200).json(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const remove = async (req, res, confNumber) => {
    try {
        // Use Mongoose to query the MongoDB database for Appointment data
        const result = await Appointment.deleteOne({ confNumber: confNumber });
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'Appointment not found' });
        }
        // Send the data as a response to the client
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBarberAppointments = async (req, res, barberPhone) => {
    try {
        const appointments = await Appointment.find({ barber: barberPhone });

        if (appointments.length < 1) {
            return res.status(404).json({ message: 'No appointments found for this barber' });
        }
        res.status(200).json(appointments);
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
    getBarberAppointments
}