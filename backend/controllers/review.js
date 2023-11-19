const Review = require('../models/Review');
const Property = require('../models/Property');
const ObjectId = require('mongodb').ObjectId;


const getAllReviews = async (req,res) => {
  const reviews = await Review.find();
  return res.status(200).json(reviews);
}

// use id(propertyId) to find the property and add review
const createReview = async (req,res) => {
  try {
  // req.body.createdBy = req.user.userId; 
  const {userId, propertyId, rating, description} = req.body;
  
  if(!userId || !rating || !description) {
    console.log(req.body);
    return res.status(401).send("Please fill the missing fields");
  }
  
  const review = await Review.create({...req.body});
  
  const currentProperty = await Property.findById({_id:propertyId});
  if(!currentProperty) {
    return res.status(401).send("No property with given id");
  }


  currentProperty.reviews.push(review);
  await currentProperty.save();

  
  return res.status(201).json(review);
  } catch (error) {
    console.log(error);
  }
}

const getReviewsByReviewId = async (req,res) => {
  const {id} = req.params;
  const review = await Review.find({_id:id});
  return res.status(200).json(review);
}

module.exports = {
  getAllReviews,
  createReview,
  getReviewsByReviewId
}

