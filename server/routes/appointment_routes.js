const express = require('express');
const router = express.Router();
const Appointment = ('../schema/appointment_schema.js');


router.get('/', async (req, res) => {
    
    try {
        const appointments = await Appointment.find();

        res.json(appointments);
    }catch (error){

        console.log(error);
        res.status(500).json({message: 'Internal Server Erroe'});

    }
});

router.post('/', async (req, res) => {

    try{
        const nAppointment = new Appointment(req.body);

        const sAppointment = await nAppointment.save();

        res.status(201).json(sAppointment);
    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

module.exports = router;
