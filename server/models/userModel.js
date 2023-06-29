const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    gender:{
        type: String,
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
    }],

    //to use later
    
    consumerOrders: [{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
        },
        status:{
            type: String,
        },
        orderId:{
            type:String
        }
    }],
    sellerOrders: [{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
        },
        buyerId:{
            type: mongoose.Schema.Types.ObjectId,
        },
        status:{
            type: String,
        },
        orderId:{
            type:String
        }
    }],
    address: {
        type: String,
    },
})
module.exports = mongoose.model('User', User);
