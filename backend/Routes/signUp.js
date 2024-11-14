const jwt = require('jsonwebtoken');

const otpRequests = require('../model/otpRequests');
const UserModel = require('../model/userModel');

const secretKey = process.env.JWT_SECRET_KEY;



async function signUP(req, res) {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const username = req.body.username;
    const name = req.body.name
    let user = await UserModel.findOne({ email: email })
    const emailreg = /^\S+@\S+\.\S+$/
    if (!emailreg.test(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const sentOTP = await otpRequests.findOne({ email: email })
    if (!sentOTP) {
      return res.status(400).json({ message: 'Request time out' })
    }
    if (sentOTP.OTP == otp && sentOTP.expireAt > new Date()) {
      await UserModel.create({
        email: email,
        username: username,
        name: name
      })
      await otpRequests.deleteOne({ email: email })
      user = await UserModel.findOne({ email: email })
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '30d' });
      res.status(201).cookie('authToken', token, { httpOnly: true, sameSite: 'Strict', secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 }).json({ message: "Registration Successful", "username": user.username });
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: "Error" })
  }

}

module.exports = signUP;
