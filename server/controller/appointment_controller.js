const moment = require('moment');
const Appointment = require('../schema/appointment_schema.js');
const Generator = require ('../mongodbService/confNumberGenerator.js');


const getAllAppointment  = async (req, res) => {
    try {
        const appointments = await Appointment.find();

        if (appointments.length < 1) {
            return res.status(404).json({ message: 'appointment not found' });
        }

        res.json(appointments);
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const getAppointment = async (req, res, id) => { 
    try{

        const appointment = await Appointment.findOne({ id : id});

        if (!appointment){
            return res.status(404).json( { message: 'Appointment not found'} );
        }
        res.json(appointment);

    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const createAppointment = async (req,res) => {
    try{
        let customId = await Generator.generator();
        const currentDate = moment().format('YYYY-MM-DD');
        const {status, price} = req.body;

        if (!['Scheduled', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const nAppointment = new Appointment({
            confNumber: customId,
            status, 
            price,
            date: currentDate 
        });

        const sAppointment = await nAppointment.save();

        res.status(201).json({
            confNumber: sAppointment.confNumber,
            status: sAppointment.status,
            price: sAppointment.price,
            date: sAppointment.date
        });   
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = {
    getAllAppointment,
    createAppointment
}