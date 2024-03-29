process.env.TZ = 'UTC'; 
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config()

// Variables
var mongoURI = process.env.MONGODB_URI;
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI).catch(function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});


// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
const corsOptions = {
    origin: function (origin, callback) {
        const whitelist = [
            'http://localhost:3000',        ];
        
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'HEAD'],
    credentials: true,
    allowedHeaders: ['authToken', 'Content-Type'],
    optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

app.use(methodOverride('_method'));
app.use(cookieParser());

// Import routes
app.get('/api', function (req, res) {
    res.json({ 'message': 'Welcome to your DIT342 backend ExpressJS project!' });
});

customerRouter = require('./routes/customer_routes.js');
app.use('/api/v1/customers', customerRouter);

barberRouter = require('./routes/barber_routes.js');
app.use('/api/v1/barbers', barberRouter);

adminRouter = require('./routes/admin_routes.js');
app.use('/api/v1/admins', adminRouter);

appointmentRouter = require('./routes/appointment_routes.js');
app.use('/api/v1/appointments', appointmentRouter);

servicesRouter = require('./routes/services_routes.js');
app.use('/api/v1/services', servicesRouter)

galleryRouter = require('./routes/gallery_routes.js');
app.use('/api/v1/galleries', galleryRouter)

authRouter = require('./routes/auth_routes.js');
app.use('/api', authRouter)

aboutRouter = require('./routes/about_routes.js');
app.use('/api/v1/abouts', aboutRouter)


// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
