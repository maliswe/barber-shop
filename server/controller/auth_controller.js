const user = require('../schema/user_schema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../schema/refreshToke_schema.js');

const login = async (req, res) => {
    try {
        const loggedUser = await user.findOne({ email: req.body.email });

        if (!loggedUser) {
            console.log("User not found for email:", req.body.email);
            return res.status(404).json({ message: 'User not found' });
        }

        const validPass = await bcrypt.compare(req.body.password, loggedUser.password);
        if (!validPass) {
            console.log("Invalid password for email:", req.body.email);
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
        const token = jwt.sign({ _id: loggedUser.id, __t: loggedUser.__t }, jwtSecret, { expiresIn: '5m' });

        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'defaultRefreshSecret';
        const refreshToken = jwt.sign({ _id: loggedUser.id }, refreshTokenSecret, { expiresIn: '7d' });

        const refreshTokenInstance = new RefreshToken({
            token: refreshToken,
            userId: loggedUser.id,
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        await refreshTokenInstance.save();

        res.cookie('authToken', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 300000) });
        res.status(200).json({ 
            token: token, 
            refreshToken: refreshToken,
            __t: loggedUser.__t
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function refresh(req, res) {
    const token = req.body.token;
    if (!token) return res.status(401).json({ message: "Refresh Token Required" });

    const existingToken = await RefreshToken.findOne({ token: token });
    if (!existingToken) return res.status(403).json({ message: "Invalid Refresh Token" });

    let userId;
    try {
        const verified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || 'defaultRefreshSecret');
        userId = verified._id;
    } catch (err) {
        return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    const newToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '5m' });
    res.json({ token: newToken });
}

module.exports = {
    login,
    refresh
};
