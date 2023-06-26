const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const jwtVerify = require('../middlewares/verifyjwt');
const uploadPhotos = require('../middlewares/uploadPhotos');

router.post('/addproduct',jwtVerify,uploadPhotos,sellerController.addProduct);

module.exports = router;