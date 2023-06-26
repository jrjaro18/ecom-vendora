const express = require('express');
const Product = require('../models/productModel');
exports.addProduct = async (req, res) => {
    const { title, price, description, category, stock } = req.body;
    const newCategory = category.split(",");
    try {
        const product = new Product({
            title,
            price,
            description,
            category:newCategory,
            stock,
            image: req.uploadedFiles,
            sellerId: req.user._id,
        });
        await product.save();
        return res.status(200).send({ msg: "Product added successfully" });
    } catch (err) {
        console.log(err);
        return res.status(202).send({ msg: "Product not added" });
    }
}