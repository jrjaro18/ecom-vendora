const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtVerify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("error1");
    //statuses were 404
    return res.status(288).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie('token');
    return res.status(288).send('Invalid token.');
  }
};

module.exports = jwtVerify;
