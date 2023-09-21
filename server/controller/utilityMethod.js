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

module.exports = {
    fieldsMapper
};