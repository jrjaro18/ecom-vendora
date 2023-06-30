const express = require('express');
const Product = require('../models/productModel');
const Fuse = require('fuse.js');

exports.searchProduct = async (req, res) => {
    try {
        var id = req.params.id;
        id = decodeURIComponent(id);
        const FuseOptions = {
            keys: [
                {
                    name: 'title',
                    weight: 0.7
                },
                {
                    name: 'category',
                    weight: 0.2
                },
                {
                    name: 'description',
                    weight: 0.1
                }],
        }
        const products = await Product.find();
        const fuse = new Fuse(products, FuseOptions);
        const result = fuse.search(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(299).send('Internal Server Error');
        console.log(err);
    }
}
exports.getProduct = async (req, res) => {
    const productId = req.params.id.split(':')[1];
    try {
        const product = await Product.findById(productId);
        //console.log(product);
        res.status(200).send(product);
    } catch (err) {
        console.log(err);
        return res.status(299).send('Unsupported Url Entered');
    }
}
exports.addReview = async (req, res) => {
    const { productId, review, rating } = req.body;
    const newRating = parseInt(rating);
    const userId = req.user._id;
    const userName = req.user.firstname + " " + req.user.lastname;
    console.log(req.user)
    try {
        const product = await Product.findById(productId);
        const reviewObj = {
            userId,
            review,
            rating: newRating,
            userName,
        }
        let ratingsSum = 0;
        product.reviews.forEach((review) => {
            ratingsSum += review.rating;
        });
        const newAverageRating = (ratingsSum + newRating) / (product.reviews.length + 1);
        product.ratings = newAverageRating;
        product.reviews.push(reviewObj);
        await product.save();
        res.status(200).send('Review added');
    } catch (err) {
        console.log(err);
        res.status(299).send('Internal Server Error');
    }
}