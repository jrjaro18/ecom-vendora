const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.register = async (req, res) => {
    var { firstname, lastname, password, email, dob, gender } = req.body;
    const salt = parseInt(process.env.PASSWORD_SALT);
    //password encryption
    bcrypt.genSalt(salt, function (err, salt) {
        if (err) throw err;
        bcrypt.hash("B4c0/\/", salt, function (err, hash) {
            if (err) throw err;
            password = hash;
        });
    });
    //checking and creating user
    try {
        //check if user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(202).send("User already exists");
        } else { //create new user
            const user = new User({
                firstname,
                lastname,
                password,
                email,
                dob,
                gender,
            });
            user.save()
        }
    } catch (err) {
        console.log(err);
    }
    res.status(201).send("User registered successfully");
}
