const moment = require('moment');
const Appointment = require('../schema/appointment_schema.js');
const Generator = require('../mongodbService/confNumberGenerator.js');
const Customer = require('../schema/customer_schema.js');
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
        const { status, price, customerPhone } = req.body;

        if (!['Scheduled', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Verify if customer exists
        const customer = await Customer.findOne({ phone: customerPhone });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Create and save the appointment
        const nAppointment = new Appointment({
            confNumber: customId,
            status,
            price,
            date: currentDate
        });

        const sAppointment = await nAppointment.save();

        // Update the customer appointments
        const updatedCustomer = await Customer.findOneAndUpdate(
            { phone: customerPhone },
            { $push: { appointments: sAppointment.confNumber } },
            { new: true }
        );

        console.log('Updated Customer:', updatedCustomer);

        res.status(201).json({
            confNumber: sAppointment.confNumber,
            status: sAppointment.status,
            price: sAppointment.price,
            date: sAppointment.date
        });
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


module.exports = {
    getAllAppointment,
    getAppointment,
    createAppointment,
    updateAppointment
}