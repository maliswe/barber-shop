const express = require('express');
const Appointment = ('../schema/appointment_schema.js');


const getAllAppointment  = async (req, res) => {
    try {
        const appointments = await Appointment.find();

        res.json(appointments);
    }catch (error){

        console.log(error);
        res.status(500).json({message: 'Internal Server Erroe'});

    }
}

const createAppointment = async (req,res) => {
    try{
        const nAppointment = new Appointment(req.body);

        const sAppointment = await nAppointment.save();

        res.status(201).json(sAppointment);
    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

module.exports = {
    getAllAppointment,
    createAppointment
}