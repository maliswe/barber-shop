const user = require('../schema/user_schema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const loggedUser = await user.findOne({ email: req.body.email });

        console.log("Received email:", req.body.email);
        console.log("Received password:", req.body.password);

        if (!loggedUser){
            console.log("User not found for email:", req.body.email);
            return res.status(404).json({ message: 'User not found' });
        }
        

        const validPass = await bcrypt.compare(req.body.password, loggedUser.password);
        if (!validPass){
            console.log("Invalid password for email:", req.body.email);
            return res.status(401).json({ message: 'Invalid Password' });
        }
        

        //Generat the token'
        // Seer (secret in arabic): environment-specific secret key
        const token = jwt.sign({ _id: loggedUser.id, role: loggedUser.role }, 'Seer', { expiresIn: '5m' }); // expries after 5 minutes

        //Set the cookies for the tokens
        res.cookie('authToken', token, { httpOnly: true, secure: true, expries: new Date(Date.now() + 300000) }); // 5 minutes

        //send the token as response to check it
        res.status(200).json({ token: token });
    } catch (error) {
        //Error handling
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    login
};