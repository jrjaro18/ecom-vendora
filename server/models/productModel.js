const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Seller id is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
    },
    category: {
        type: Array,
        required: [true, 'Product category is required'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        trim: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    image: [
        {
            type: String,
            required: [true, 'Product image is required'],
        }
    ],
    //to use later

    buyers: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User id is required'],
        },
        userName:{
            type: String,
        },
        review: {
            type: String,
            required: [true, 'Review is required'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
        },
    }],
});

module.exports = mongoose.model('Product', productSchema);
