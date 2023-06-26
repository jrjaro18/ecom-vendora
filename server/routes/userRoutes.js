const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtVerify = require('../middlewares/verifyjwt');

//route for user registration
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', jwtVerify ,userController.logout);
router.post('/googlelogin', userController.googlelogin);
router.post('/alter/cart', jwtVerify, userController.alterCart);
router.post('/alter/wishlist', jwtVerify, userController.alterWishlist);
router.get('/set/productState/forUser/:id', jwtVerify, userController.setProductsUser);
module.exports = router;