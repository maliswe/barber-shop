var mongoose = require('mongoose');

var mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('Missing MONGODB_URI for dropping test database.');
    process.exit(1);
}

mongoose.connect(mongoURI).catch(function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
});
mongoose.connection.dropDatabase().then(function () {
    console.log(`Dropped database: ${mongoURI}`);
    process.exit(0);
});

//The MongoDB connection URI retrieved from the environment variable.
//Connect to the MongoDB database using the provided URI.
//Drop the connected MongoDB database and exit the script.
