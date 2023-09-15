const mongoose = require('mongoose');
const Appointment = require('../schema/appointment_schema');

 async function generator () {

    let confNumber;
    const characters = '0123456789';

    do {

        confNumber = '';
        for (let i = 0; i < 7; i++) {
            const random = Math.floor(Math.random() * characters.length);
            confNumber += characters.charAt(random);
        }
    } while (await this.confNumberChecker(confNumber));

    return confNumber;
}
async function confNumberChecker (confNumber) {
    const existingAppointment = await Appointment.findOne({ "confNumber": confNumber });
    return !!existingAppointment;
}


module.exports = {
    generator,
    confNumberChecker
};