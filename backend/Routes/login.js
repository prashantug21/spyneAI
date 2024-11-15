const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

const User = require('../model/userModel');
const otpRequests = require('../model/otpRequests');

async function login(req, res) {
    try {
        console.log(1)
        const { email, otp } = req.body;
        const user = await User.findOne({ email: email });
        const sentOTP = await otpRequests.findOne({ email: email });
        const emailreg = /^\S+@\S+\.\S+$/
        if (!emailreg.test(email)) {
            return res.status(400).json({ message: 'Invalid email' })
        }
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (!sentOTP) {
            return res.status(400).json({ message: 'Request Time out' });
        }
        if (sentOTP.OTP != otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        console.log(2)
        await otpRequests.deleteOne({ email: email })
        const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '30d' });
        return res.status(200).cookie('authToken', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 }).json({ message: "Login Successful", "username": user.username });

    } catch (e) {
        return res.status(400).json({ message: 'Some Error has occured' });
    }

}

module.exports = login;
