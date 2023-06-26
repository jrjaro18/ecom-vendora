const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const jwtVerify = require('../middlewares/verifyjwt');

router.get('/search/:id', productController.searchProduct);
router.get('/get/:id',productController.getProduct);
router.post('/add/review', jwtVerify ,productController.addReview);
module.exports = router;