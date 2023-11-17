import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import { getAllReviews, getReviewById, createReview } from '../Store/reviewSlice';

const id = "4eb6e7e7e9b7f4194e000001";
const propertyId = "65573f64b12dc335da0b0bb6";

const Review = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review);

  const [rating,setRating] = useState();
  const [description,setDescription] = useState("");

  const handleRating = (e) => {
    setRating(e.target.value);
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleCreateRating = (e) => {
    e.preventDefault();
    const review = {propertyId, userId:id, rating:Number(rating), description};
    console.log(review);
    dispatch(createReview(review));
  }

  const handleGetReviews = (e) => {
    e.preventDefault();
    dispatch(getAllReviews());
  }

  const handleSingleReview = (e) => {
    e.preventDefault();
    dispatch(getReviewById("6557834023b4a7da625383a3"));
  }

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);


  return (
    <div>

      <input type="number" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='rating' value={rating} onChange={handleRating}/>

      <input type="text" className='border-2 rounded-xl py-1 px-3  w-full' placeholder='description' value={description} onChange={handleDescription}/>

      <button onClick={handleCreateRating}>Create Rating</button>

      <hr />
      <button onClick={handleGetReviews}>Get Reviews</button>

      
      <hr />
      <button onClick={handleSingleReview}>Get Single Review</button>
    </div>
  )
}

export default Review