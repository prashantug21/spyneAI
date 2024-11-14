const jwt = require('jsonwebtoken');
const User = require('../../model/userModel'); // Make sure to import the User model if needed


const secretKey = process.env.JWT_SECRET_KEY;

async function auth(req, res, next) {

  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, async function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Fetch the user using the decoded ID from the token
      const user = await User.findOne({ _id: decoded._id });

      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = user; // Attach user to request for future middleware or routes
      next(); // Proceed to the next middleware or route
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

module.exports = auth;
