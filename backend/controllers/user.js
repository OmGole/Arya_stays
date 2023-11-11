const { ObjectId } = require('mongodb');
const User = require('../models/User');

const getAllUser = async (req,res) => {
  try {
    const queryOptions = {};
    const users = await User.find(queryOptions);
    return res.status(200).json(users);  
  } catch (error) {
    console.log(error);
  }
}

const createUser = async (req,res) => {
  try {
    const {_id, name,email,age,phone} = req.body;
    // const object_Id = new ObjectId(_id);

    if(!_id || !name || !email || !age || !phone) {
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
  // req.body._id = object_Id;  
  user = await User.create({...req.body});

  return res.status(200).json(user);
  } catch (error) {
    console.log(error)
  }
}

const getUser = async (req,res) => {
  try {
    const {id:userID} = req.params;
    const user = await User.findOne({_id:userID});
    if(!user) {
      return res.status(404).json({msg:`No property with id: ${userID}`});
    }
    return res.status(201).json(user);  
  } catch (error) {
    console.log(error);
  }  
}

const updateUser = async (req,res) => {
  try {
    const {id:userID} = req.params;
    const user = await User.findById({_id:userID});

    if(!user) {
      return res.status(404).json({msg:`No task with id: ${userID}`});
    }

    const updatedUser = await User.findOneAndUpdate({_id:userID}, req.body, {
      new:true,
    });
    
    return res.status(200).json(updatedUser);  
  } catch (error) {
    console.log(error);
  }  
}

const deleteUser = async (req,res) => {
  try {
    const {id:userID} = req.params;
    const user = await User.findById({_id:userID});

    if(!user) {
      return res.status(404).json({msg:`No task with id: ${userID}`});
    }

    await User.findByIdAndDelete({_id:userID});
    return res.status(200).json(user);  
    } catch (error) {
    console.log(error);
  }
}

module.exports = {getAllUser,createUser,getUser,updateUser,deleteUser};