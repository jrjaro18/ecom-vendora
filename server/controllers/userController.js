const User = require('../models/userModel');
const Product = require('../models/productModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');

require('dotenv').config();
exports.register = async (req, res) => {
    const { firstname, lastname, password, email, dob, gender } = req.body;
    //checking and creating user
    try {
        //check if user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(202).send("User already exists");
        } else {
            //password encryption
            const salt = parseInt(process.env.PASSWORD_SALT);
            var newPassword = await bcrypt.hash(password, salt);
            //create new user
            const user = new User({
                firstname,
                lastname,
                password: newPassword,
                email,
                dob,
                gender,
            });
            await user.save()
            return res.status(201).send("User registered successfully");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }

}

exports.login = async (req, res) => {
    var { email, password } = req.body;
    try {
        const user = await User.findOne({ email }, { "firstname": 1, "lastname": 1, "email": 1, "_id": 1, "password": 1 });
        if (!user) {

            return res.status(202).send("User not found");
        } else {
            //check password
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) throw err;
                if (result) {
                    user.password = undefined;
                    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    return res.status(200).send({ msg: "User logged in successfully", userDetails: user });
                } else {
                    return res.status(202).send("Incorrect password");
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.googlelogin = async (req, res) => {
    const { email, firstname, lastname } = req.body;
    try {
        var user = await User.findOne({ email }, { "firstname": 1, "lastname": 1, "email": 1, "_id": 1 });
        if (!user) {
            user = new User({
                firstname,
                lastname,
                email,
            });
            await user.save()
        } else {
            user.password = undefined;
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        });
        return res.status(200).send({ msg: "User logged in successfully", userDetails: user });
    } catch (err) {
        console.log(err);
        return res.status(202).send({ msg: "User logged in successfully" });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).send("User logged out successfully");
}

exports.alterCart = async (req, res) => {
    const { productId } = req.body;
    //if item already in carts
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user) {
            var cart = user.cart || [];
            var index = cart.findIndex((item) => item == productId);
            if (index != -1) {
                cart.splice(index, 1);
                user.cart = cart;
                await user.save();
                return res.status(200).send("Item Removed from cart");
            } else {
                cart.push(productId);
                user.cart = cart;
                await user.save();
                return res.status(200).send("Item Added to cart");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}

exports.alterWishlist = async (req, res) => {
    const { productId } = req.body;
    //if item already in carts
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user) {
            var wishlist = user.wishlist || [];
            var index = wishlist.findIndex((item) => item == productId);
            if (index != -1) {
                wishlist.splice(index, 1);
                user.wishlist = wishlist;
                await user.save();
                return res.status(200).send("Item Removed from wishlist");
            } else {
                wishlist.push(productId);
                user.wishlist = wishlist;
                await user.save();
                return res.status(200).send("Item Added to wishlist");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}

exports.setProductsUser = async (req, res) => {
    const productId = req.params.id.split(':')[1];
    //console.log(productId);

    try {
        //is Product in cart
        const presentCart = await User.findOne({ _id: req.user._id, cart: productId });
        //is Product in wishlist
        const presentWishlist = await User.findOne({ _id: req.user._id, wishlist: productId });
        //can a person review
        const reviewer = await Product.findOne({ _id: productId, buyers: req.user._id })
        const reviewed = await Product.findOne({ _id: productId, reviews: { $elemMatch: { userId: req.user._id } } });
        var canReview = false;
        if (reviewer) {
            if (reviewed) {
                canReview = false;
            } else {
                canReview = true;
            }
        }
        //console.log(reviewer, reviewed , canReview);
        if (presentCart && presentWishlist) {
            return res.status(200).send({ cart: true, wishlist: true, canReview: canReview });
        } else if (presentCart) {
            return res.status(200).send({ cart: true, wishlist: false, canReview: canReview });
        }
        else if (presentWishlist) {
            return res.status(200).send({ cart: false, wishlist: true, canReview: canReview });
        }
        else {
            return res.status(200).send({ cart: false, wishlist: false, canReview: canReview });
        }

    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}

exports.getCart = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }, { cart: 1 });
        var cart = [];
        var userCartPrice = 0;
        if (user) {
            for (let i = 0; i < user.cart.length; i++) {
                const product = await Product.findById(user.cart[i], { description: 0, reviews: 0, buyers: 0, __v: 0 });
                cart.push(product);
                userCartPrice += product.price;
            }
            //console.log(cart);
            return res.status(200).send({ cart: cart, userCartPrice: userCartPrice, userDetails: req.user });
        }
    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }, { wishlist: 1 });
        var wishlist = [];
        var userWishlistPrice = 0;
        if (user) {
            for (let i = 0; i < user.wishlist.length; i++) {
                const product = await Product.findById(user.wishlist[i], { description: 0, reviews: 0, buyers: 0, __v: 0 });
                wishlist.push(product);
                userWishlistPrice += product.price;
            }
            //console.log(wishlist);
            return res.status(200).send({ wishlist: wishlist, userWishlistPrice: userWishlistPrice });
        }
    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}

exports.checkout = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_ID_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        });
        const { pincode, address, state, price } = req.body;

            const user = await User.findById(req.user._id);
            user.address = address+", "+pincode+", "+state;
            await user.save();

        var options = {
            amount: price * 100,  // amount in the smallest currency unit
            currency: "USD",
            receipt: req.user._id + "-" + new Date().getTime()
        };

        const order = await razorpay.orders.create(options);
        console.log(order);
        return res.status(200).send({ order: order, userDetails: req.user });

    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}

exports.checkoutSuccess = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const userId = req.params.id.split(':')[1].split('}')[0];
    //console.log(userId);
    try {
        //verification
        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');
        if (digest !== razorpay_signature)
            return res.status(400).json({ msg: "Transaction not legit!" });
        //saving order for buyer
        const user = await User.findById(userId);
        const tempArr = [];
        if (user) {
            const userCart = user.cart;
            for (item in userCart) {
                tempArr.push(
                    {
                        productId: (userCart[item]),
                        status: "pending",
                        orderId: razorpay_order_id,
                    });
            }
            user.consumerOrders = tempArr;
            user.cart = [];
            await user.save();
            console.log("tempArr", tempArr);
        } else {
            return res.status(400).json({ msg: "User not found!" });
        }
        //saving order for seller
        for (item in tempArr){
            const product = await Product.findById(tempArr[item].productId);
            product.buyers.push((userId));
            product.stock = product.stock - 1;
            await product.save();
            const sellerId = product.sellerId;
            const user = await User.findById(sellerId);
            user.sellerOrders.push({
                productId: (tempArr[item].productId),
                status: "pending",
                orderId: razorpay_order_id,
                buyerId: (userId),
            })
            await user.save();
        }
        res.status(200).redirect("http://localhost:3000/");
    }
    catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}

exports.productsBought = async (req, res) => {
    const userId = req.user._id;
    try {
        const products = await Product.find({ buyers: userId }, { description: 0, reviews: 0, buyers: 0, __v: 0 });
        res.status(200).send({ products: products });
    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}
exports.productsSold = async (req, res) => {
    const userId = req.user._id;
    try {
        const products = await Product.find({ sellerId: userId }, { description: 0, reviews: 0, __v: 0 });
        res.status(200).send({ products: products });
    } catch (err) {
        console.log(err);
        res.status(299).send("Internal server error");
    }
}
exports.checkLogin = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            return res.status(200).send({ user: user });
        }
    } catch (err) {
        console.log(err);
        res.status(299).send("No User");
    }
}