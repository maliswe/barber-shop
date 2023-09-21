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


module.exports = {
    fieldsMapper,
    sort,
    recSkipper
};