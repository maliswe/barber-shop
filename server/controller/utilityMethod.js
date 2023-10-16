const mongoose = require('mongoose');
const Appointment = require('../schema/appointment_schema');


function fieldsMapper(schemaType, requestBody) {
    const fieldsToUpdate = Object.keys(schemaType.schema.paths).filter((fieldName) => {
        const field = schemaType.schema.paths[fieldName];
        return field.isRequired && !field.options.hidden;
    });

    for (const field of fieldsToUpdate) {
        if (requestBody[field]) {
            schemaType[field] = requestBody[field];
        }
    }
}

function sort(sortOrder) {

    if (sortOrder === 'asc'){
        return 1
    } else if (sortOrder === 'desc'){
        return -1
    } else {
        return 0
    }
}


function recSkipper(page=1, pageSize=10) {
    skip = (page - 1) * pageSize;
    return skip
}

async function generator () {

    let confNumber;
    const characters = '0123456789';

    do {

        confNumber = '';
        for (let i = 0; i < 7; i++) {
            const random = Math.floor(Math.random() * characters.length);
            confNumber += characters.charAt(random);
        }
    } while (await confNumberChecker(confNumber));

    return confNumber;
}
async function confNumberChecker (confNumber) {
    const existingAppointment = await Appointment.findOne({ "confNumber": confNumber });
    return !!existingAppointment;
}


module.exports = {
    fieldsMapper,
    sort,
    recSkipper,
    generator,
    confNumberChecker
};

//Utility functions for common operations.
//This module provides various utility functions for working with data.