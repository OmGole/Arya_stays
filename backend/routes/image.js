const express = require('express');
const router = express.Router();


const {
  getAllImages,
  getSingleImage,
  updateImage,
  deleteImage,
  createImage
} = require('../controllers/image');

router.route('/').get(getAllImages).post(createImage);
router.route('/:id').get(getSingleImage).patch(updateImage).delete(deleteImage);

module.exports = router;