const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['customer', 'admin', 'barber'],
    }
});

// Define a discriminator for customer
userSchema.discriminator('Customer', new Schema({

}));

// Define a discriminator for admin
userSchema.discriminator('Admin', new Schema({

}));

userSchema.discriminator('Barber', new Schema({
    Expertise: String,
    Image: String
}));

const User = mongoose.model("Users", userSchema);

module.exports = User;
