const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');


const register = async (req,res) => {
  try {
  const {name,email,password} = req.body;
  if(!name || !email || !password) {
    return res.status(401).send("Please Provide Name, Email and Password");
  }
  const isValidEmail = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
      
  if(!isValidEmail) return res.status(401).send("Invalid Email");
  let user = await User.findOne({email});
  if(user) return res.status(400).send("User already exists");
  user = await User.create({...req.body});
  const token = user.createJWT();
  return res.status(StatusCodes.CREATED).json({user:{name:user.name}, token});
  } catch (error) {
    console.log(error)
  }
  
}

const login = async (req,res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.status(401).send("Please Provide Email and Password");
  }
  const user = await User.findOne({email});
  if(!user) {
    return res.status(401).send("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect) {
    return res.status(401).send("Invalid Credentials");
  }
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

module.exports = {login,register};