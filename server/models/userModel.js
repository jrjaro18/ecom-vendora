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
        type: Date,
    },
    address: {
        type: String,
    },
    gender:{
        type: String,
    },
    token: {
        type: String,
    },
})
module.exports = mongoose.model('User', User);
