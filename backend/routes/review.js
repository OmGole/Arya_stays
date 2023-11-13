const express = require('express');
const router = express.Router();


const {
  getAllReviews,
  createReview,
  getReviewsByReviewId
} = require('../controllers/review');

router.route('/').get(getAllReviews);
router.route('/:id').post(createReview).get(getReviewsByReviewId);

module.exports = router;