const express = require('express');
const router = express.Router();


const {
  getAllReviews,
  createReview,
  getReviewsByReviewId,
  deleteReview
} = require('../controllers/review');

router.route('/').get(getAllReviews).post(createReview);
router.route('/:id').get(getReviewsByReviewId).delete(deleteReview);

module.exports = router;