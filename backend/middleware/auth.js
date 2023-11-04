const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];

  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = {userId:payload.userId, name:payload.name,role:payload.role};
  next();
} 

const authAdmin = (req,res,next) => {
  if(req.user.role === "user") {
    next(new Error("Not an Admin!!"));
  }

  next();
}

module.exports = {auth,authAdmin};