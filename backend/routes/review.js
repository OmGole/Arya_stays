const express = require('express');
const router = express.Router();


const {
  getAllReviews,
  createReview,
  getReviewsByReviewId
} = require('../controllers/review');

router.route('/').get(getAllReviews).post(createReview);
router.route('/:id').get(getReviewsByReviewId);

module.exports = router;